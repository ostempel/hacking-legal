from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from pydantic import BaseModel, Field
import spacy
from typing import List, Dict, Optional
from transformers import AutoTokenizer, AutoModel, pipeline
import torch
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import io
import random  # temporary for demo purposes
import requests
import json
import pymupdf  
import pymupdf4llm


# Load English language model
nlp = spacy.load("en_core_web_sm")

# Load Legal-BERT model and tokenizer
legal_bert_tokenizer = AutoTokenizer.from_pretrained("nlpaueb/legal-bert-base-uncased")
legal_bert_model = AutoModel.from_pretrained("nlpaueb/legal-bert-base-uncased")

app = FastAPI()

class TextInput(BaseModel):
    text: str

class Entity(BaseModel):
    text: str
    label: str
    start: int
    end: int

class ExtractionResponse(BaseModel):
    entities: List[Entity]
    key_phrases: List[str]
    sentences: List[str]
    tokens: List[str]

class LegalBertResponse(BaseModel):
    embeddings: List[List[float]]
    tokens: List[str]

class LLMRequest(BaseModel):
    model: str
    prompt: str
    stream: bool

class LLMResponse(BaseModel):
    response: str

@app.post("/extract")
async def extract_information(text_input: TextInput):
    try:
        # Process the text with spaCy
        doc = nlp(text_input.text)
        
        # Extract entities
        entities = [
            Entity(
                text=ent.text,
                label=ent.label_,
                start=ent.start_char,
                end=ent.end_char
            )
            for ent in doc.ents
        ]
        
        # Extract other information
        key_phrases = [chunk.text for chunk in doc.noun_chunks]
        sentences = [str(sent) for sent in doc.sents]
        tokens = [
            token.text 
            for token in doc 
            if not token.is_stop and not token.is_punct and token.is_alpha
        ]
        
        return ExtractionResponse(
            entities=entities,
            key_phrases=key_phrases,
            sentences=sentences,
            tokens=tokens
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract_pdf_llm")
async def extract_from_pdf_llm(
    file: UploadFile = File(...),
    model: str = Query("llama3.2", description="The LLM model to use"),
    prompt_template: str = Query(
        "{text}\n\n"
        "Answer the following questions shortly:\n"
        "1. Who is the appellant and appellee? Give me their names and the names and their lawyers.\n"
        "2. Has this law suite any relevance to BMW?\n"
        "3. Is this a high risk for the company BMW?\n"
        "4. What is the complaint and legal action?\n"
        "5. Summarize the case in a few sentences containing all the relevant information?\n\n",
        description="Template for the prompt, use {text} where the document content should be inserted"
    )
):
    try:
        # Extract text from PDF
        contents = await file.read()
        pdf_file = io.BytesIO(contents)

        # Jetzt die Bytes direkt in PyMuPDF öffnen
        doc = pymupdf.open(stream=pdf_file, filetype="pdf")
        md_text = pymupdf4llm.to_markdown(doc)
        print(f"MD text: {md_text}")
        
        prompt = prompt_template.format(text=md_text)
        llm_request_header = {
            "model": "llama3.2", 
            "prompt": f"{md_text}\n\nWho is the appellant and appellee with full names in this lawsuit? Answer in a json format with the keys 'appellant' and 'appellee'.",
            "stream": False
        }
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=llm_request_header
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Failed to get response from LLM service"
            )
        llm_response_header = response.json()
        print(f"LLM response header: {llm_response_header.get('response', '')}")

        llm_request = {
            "model": model,
            "prompt": prompt,
            "stream": False
        }
        
        # Send request to local LLM service
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=llm_request
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Failed to get response from LLM service"
            )
        
        print("successfully got response")
        llm_response = response.json()
        print(f"LLM response: {llm_response.get('response', '')}")


        # Extract appellant and appellee information
        appellant_and_appellee = extract_appellant_and_appellee(md_text)
        print(f"Appellant and appellee: {appellant_and_appellee}")

        return LLMResponse(response=llm_response.get("response", ""))
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

def extract_appellant_and_appellee(text: str) -> str:
    # Send request to local LLM service
    llm_request = {
        "model": "llama3.2", 
        "prompt": f"{text}\n\nWho is the appellant and appellee in this text? Answer in a json format with the keys 'appellant' and 'appellee'.",
        "stream": False
    }
    
    response = requests.post(
        "http://localhost:11434/api/generate",
        json=llm_request
    )
    
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Failed to get response from LLM service"
        )
        
    llm_response = response.json()
    return llm_response.get("response", "")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)