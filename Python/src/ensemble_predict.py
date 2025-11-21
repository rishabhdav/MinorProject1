import os
import sys
import numpy as np
import joblib
import tensorflow as tf

# Add project root to Python path
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT_DIR)

# Model artifact paths
SAVE_DIR = "models"
SCALER_PATH = os.path.join(SAVE_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(SAVE_DIR, "label_encoder.pkl")
ANN_PATH = os.path.join(SAVE_DIR, "crop_ann_full.keras")
XGB_PATH = os.path.join(SAVE_DIR, "crop_xgb_full.pkl")
META_PATH = os.path.join(SAVE_DIR, "stack_meta_xgb.pkl")

# Load all artifacts once
scaler = joblib.load(SCALER_PATH)
label_encoder = joblib.load(ENCODER_PATH)
ann_model = tf.keras.models.load_model(ANN_PATH)
xgb_model = joblib.load(XGB_PATH)
meta_model = joblib.load(META_PATH)

def stacked_predict(N, P, K, temperature, humidity, ph, rainfall):
    """
    Returns TOP 3 crop recommendations using stacked ANN + XGBoost + Meta-XGBoost.
    """

    # Prepare input
    X = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

    # Scale input
    X_scaled = scaler.transform(X)

    # Base model probabilities
    ann_probs = ann_model.predict(X_scaled, verbose=0)          # shape (1, num_classes)
    xgb_probs = xgb_model.predict_proba(X_scaled)               # shape (1, num_classes)

    # Stack probabilities
    meta_features = np.hstack([xgb_probs, ann_probs])

    # Meta model probabilities
    final_probs = meta_model.predict_proba(meta_features)[0]    # shape (num_classes,)

    # Get top 3 class indices
    top3_indices = final_probs.argsort()[-3:][::-1]             # highest → lowest

    # Convert indices to crop names
    top3_crops = label_encoder.inverse_transform(top3_indices)

    # Confidence scores (rounded)
    top3_conf = [round(float(final_probs[i]), 4) for i in top3_indices]

    # Return list of (crop, confidence)
    return list(zip(top3_crops, top3_conf))

# Test script
if __name__ == "__main__":
    top3 = stacked_predict(90, 40, 40, 25, 80, 6.5, 200)
    print("Top 3 Recommendations:")
    for crop, score in top3:
        print(f"{crop}: {score}")

