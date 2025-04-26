from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from pydantic import BaseModel, Field
import spacy
from typing import List, Dict, Optional
from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import io
import random  # temporary for demo purposes

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

@app.post("/extract2")
async def extract_legal_bert(text_input: TextInput):
    try:
        # Tokenize and get embeddings from Legal-BERT
        inputs = legal_bert_tokenizer(text_input.text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        
        with torch.no_grad():
            outputs = legal_bert_model(**inputs)
            
        # Get the embeddings from the last hidden state
        embeddings = outputs.last_hidden_state.squeeze(0).tolist()
        
        # Get the tokens
        tokens = legal_bert_tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
        
        return LegalBertResponse(
            embeddings=embeddings,
            tokens=tokens
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract_pdf")
async def extract_from_pdf(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        text_input = TextInput(text=text)
        return await extract_information(text_input)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)