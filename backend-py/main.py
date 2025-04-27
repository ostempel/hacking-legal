from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from pydantic import BaseModel
import os
import shutil
import uuid
import json
import requests
from ollama import generate, GenerateResponse
from typing import Optional, List
app = FastAPI()

class Case(BaseModel):
  appellant: str
  appellee: str
  relevant_to_bmw: bool
  subject_of_case: bool
  high_risk: bool
  complaint_and_legal_action: str
  department: Optional[List[str]]
  summary: str

# Settings control global defaults
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
Settings.llm = Ollama(model="llama3.2", request_timeout=360.0)

# Ensure data directory exists
os.makedirs("data", exist_ok=True)

# Initialize index and query engine at startup
allReader = SimpleDirectoryReader("data", recursive=True)
documents = allReader.load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

def reload_index():
    global index, query_engine
    documents = SimpleDirectoryReader("data", recursive=True).load_data()
    index = VectorStoreIndex.from_documents(documents)
    query_engine = index.as_query_engine()

def set_index(path: str):
    global index, query_engine
    documents = SimpleDirectoryReader(path, recursive=True).load_data()
    index = VectorStoreIndex.from_documents(documents)
    query_engine = index.as_query_engine()

def parse_text_to_json(text: str) -> str:
    return json.loads(text)

agent = AgentWorkflow.from_tools_or_functions(
    [parse_text_to_json],
    llm=Settings.llm,
    system_prompt="""You are a helpful assistant and parse text to json.""",
)

class QueryRequest(BaseModel):
    uuid: str
    query: str

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF file to the database.
    """
    try:
        # Ensure file is PDF
        if not file.filename.endswith('.pdf'):
            return JSONResponse(
                status_code=400,
                content={"message": "Only PDF files are allowed"}
            )
        
        print("Uploading PDF...")
        # Create a unique directory for this upload
        upload_id = str(uuid.uuid4())
        upload_dir = os.path.join("data", upload_id)
        os.makedirs(upload_dir, exist_ok=True)
        print("Uploading PDF to", upload_dir)
        
        # Save the file in the unique directory
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Reload the index with new document
        reload_index()
        
        return JSONResponse(
            status_code=200,
            content={
                "message": f"Successfully uploaded {file.filename}",
                "upload_id": upload_id,
                "file_path": file_path
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"An error occurred: {str(e)}"}
        )

@app.post("/query")
async def query(request: QueryRequest):
    """
    Query the database for a specific case.
    """
    prompt = "1. Who is the appellant and appellee by name?.\n2. Has this law suite any relevance to BMW?\n3. Is BMW the subject of this case?\n4. Is this a high risk law suite for the company BMW?\n5. What is the complaint and legal action?\n6. To which department of BMW is this case relevant [Product and Litigation, Corporate Finance, Financial Services and M&A, Intellectual Property, Data and Digital Law, Legal Operations, Antitrust Law Coordination, BMW Group Compliance, Labor and Social Law, Tax Law]?\n7. Summarize the case in a few sentences containing all the relevant information?"
    reader = SimpleDirectoryReader(os.path.join("data", request.uuid), recursive=True)
    docs = reader.load_data()
    i = VectorStoreIndex.from_documents(docs)
    qe = i.as_query_engine()

    print("Querying...")
    try:
        res = await qe.aquery(f"Reference the case {request.query} and answer the questions shortly:\n" + prompt)

        print("Successfully queried")
        response: GenerateResponse = generate(model='llama3.2', stream=False,
            prompt=f"{res.response}\n\n" + prompt,
            format=Case.model_json_schema())
        
        print("Successfully generated response")

        # Parse the string response into JSON object
        try:
            json_response = json.loads(response.response)
            return json_response
        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail="Failed to parse response as JSON")
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"An error occurred: {str(e)}"}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)