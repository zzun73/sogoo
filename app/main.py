from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
import torch

from .schemas import TextInput, PredictionResponse, HealthResponse
from .model import KoBERTClassifier

app = FastAPI(
    title="소상한 구독 리뷰 분석 API",
    description="리뷰 텍스트의 긍정/부정을 분석하는 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모델 경로 설정
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = str(BASE_DIR / "models" / "KoBERTTrainModel.pt")

# 모델 인스턴스 생성
classifier = KoBERTClassifier(MODEL_PATH)

@app.on_event("startup")
async def startup_event():
    """애플리케이션 시작 시 모델을 로드합니다."""
    if not classifier.load():
        raise RuntimeError("모델 로드에 실패했습니다.")

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """서버와 모델의 상태를 확인합니다."""
    return {
        "status": "healthy",
        "model_loaded": classifier.is_loaded,
        "device": str(classifier.device)
    }

@app.post("/api/predict", response_model=PredictionResponse)
async def predict(input_data: TextInput):
    """텍스트에 대한 감성 분석을 수행합니다."""
    try:
        if not classifier.is_loaded:
            raise HTTPException(status_code=500, detail="모델이 로드되지 않았습니다.")

        if not input_data.text.strip():
            raise HTTPException(status_code=400, detail="텍스트가 비어있습니다.")

        prediction = classifier.predict(input_data.text)
        
        return {
            "text": input_data.text,
            **prediction
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """API 루트 엔드포인트"""
    return {
        "message": "소상한 구독 리뷰 분석 API",
        "docs_url": "/docs",
        "health_check": "/health"
    }