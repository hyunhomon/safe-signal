from fastapi import FastAPI
from ai.model_manager import ModelManager

app = FastAPI()

@app.get("/")
async def root():
    return
