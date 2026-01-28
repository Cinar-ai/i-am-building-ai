from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "gemma:2b"

class Message(BaseModel):
    role: str
    content: str

@app.post("/chat")
def chat(messages: list[Message]):
    payload = {
        "model": MODEL_NAME,
        "messages": [message.dict() for message in messages]
    }
    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()
    return response.json()

