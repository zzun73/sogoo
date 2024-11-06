import torch
import torch.nn.functional as F
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from pathlib import Path

class KoBERTClassifier:
    def __init__(self, model_path: str):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model_path = model_path
        self.model_name = 'monologg/kobert'
        self.model = None
        self.tokenizer = None
        self.config = None
        
    def load(self):
        """모델과 토크나이저를 로드합니다."""
        try:
            # 토크나이저와 설정 로드
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, trust_remote_code=True)
            self.config = AutoConfig.from_pretrained(self.model_name)
            
            # 모델 구조 생성 및 가중치 로드
            self.model = AutoModelForSequenceClassification.from_config(self.config)
            self.model.load_state_dict(torch.load(self.model_path, map_location=self.device))
            
            self.model.to(self.device)
            self.model.eval()
            return True
        except Exception as e:
            print(f"모델 로드 중 에러 발생: {str(e)}")
            return False

    def predict(self, text: str):
        """텍스트에 대한 예측을 수행합니다."""
        if not self.model or not self.tokenizer:
            raise RuntimeError("모델이 로드되지 않았습니다.")

        # 입력 텍스트 전처리
        inputs = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        # 입력을 GPU/CPU에 맞게 이동
        input_ids = inputs['input_ids'].to(self.device)
        attention_mask = inputs['attention_mask'].to(self.device)

        # 예측 수행
        with torch.no_grad():
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
            logits = outputs.logits
            probabilities = F.softmax(logits, dim=1).squeeze()
            
            positive_prob = probabilities[1].item() * 100
            negative_prob = probabilities[0].item() * 100
            
            predicted_class = 1 if positive_prob > negative_prob else 0
            confidence = max(positive_prob, negative_prob)

        return {
            'predicted_class': predicted_class,
            'confidence': confidence / 100,  # 0~1 사이 값으로 변환
            'class_name': '긍정' if predicted_class == 1 else '부정',
            'probabilities': {
                'positive': round(positive_prob, 2),
                'negative': round(negative_prob, 2)
            }
        }

    @property
    def is_loaded(self):
        """모델이 로드되었는지 확인합니다."""
        return self.model is not None and self.tokenizer is not None