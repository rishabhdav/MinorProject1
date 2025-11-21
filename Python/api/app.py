from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
import tensorflow as tf
import os
import sys

# Add project root
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT_DIR)

from src.ensemble_predict import stacked_predict

app = FastAPI(
    title="Crop Recommendation API",
    description="Predict top 3 crops using Stacked ANN + XGBoost model",
    version="1.0.0",
)

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


@app.get("/")
def root():
    return {"message": "Crop Recommendation API is running!"}


@app.post("/crop-recommend")
def predict_crop(data: CropInput):
    top3 = stacked_predict(
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    )

    response = []
    for crop, conf in top3:
        response.append({"crop": crop, "confidence": conf})

    return {
        "status": "success",
        "top_3_crops": response
    }
