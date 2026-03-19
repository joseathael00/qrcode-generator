from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from generator import generate

app = FastAPI()

# Configuração para a API aceitar requisições do front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Converte as requisições para string
class Data(BaseModel):
    url: str


# Rota post que recebe a url, transforma em imagem e responde ao front-end
@app.post("/")
def recieve(data: Data):
    url = data.url
    buffer = generate(url)
    return StreamingResponse(buffer, media_type="image/png")
