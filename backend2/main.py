from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from pydantic import BaseModel
import asyncio
import os
import shutil
import uuid

app = FastAPI()

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

async def search_documents(query: str) -> str:
    response = await query_engine.aquery(query)
    return str(response)

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

agent = AgentWorkflow.from_tools_or_functions(
    [search_documents],
    llm=Settings.llm,
    system_prompt="""You are a helpful assistant that helps searching legal documents and extracts information.""",
)

class QueryRequest(BaseModel):
    uuid: str
    query: str

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
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
    print(request.uuid)
    reader = SimpleDirectoryReader(os.path.join("data", request.uuid), recursive=True)
    docs = reader.load_data()
    i = VectorStoreIndex.from_documents(docs)
    qe = i.as_query_engine()

    async def sdocs(query: str) -> str:
        response = await qe.aquery(query)
        return str(response)
    
    a = AgentWorkflow.from_tools_or_functions(
        [sdocs],
        llm=Settings.llm,
        system_prompt="""You are a helpful assistant that helps searching legal documents and extracts information.""",
    )
    print("Querying...")
    try:
        res = await qe.aquery(f"Reference the case {request.query} and answer the questions shortly:\n1. Who is the appellant and appellee? Give me their names and the names and their lawyers.\n2. Has this law suite any relevance to BMW?\n3. Is this a high risk for the company BMW?\n4. What is the complaint and legal action?\n5. Summarize the case in a few sentences containing all the relevant information?")
        
        return {"response": res}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"An error occurred: {str(e)}"}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)