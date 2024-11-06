from pydantic import BaseModel
from typing import Dict, Optional

class TextInput(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    text: str
    predicted_class: int
    confidence: float
    class_name: str
    probabilities: Dict[str, float]

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    device: str  # CPU/GPU 정보 추가