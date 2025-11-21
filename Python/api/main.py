from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
from PIL import Image
import numpy as np
from PIL import Image, ImageEnhance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODEL
model = tf.keras.models.load_model("../Models/trained_model.h5")

# CLASS LABELS
class_names = [
 'Apple___Apple_scab',
 'Apple___Black_rot',
 'Apple___Cedar_apple_rust',
 'Apple___healthy',
 'Blueberry___healthy',
 'Cherry_(including_sour)___Powdery_mildew',
 'Cherry_(including_sour)___healthy',
 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
 'Corn_(maize)___Common_rust_',
 'Corn_(maize)___Northern_Leaf_Blight',
 'Corn_(maize)___healthy',
 'Grape___Black_rot',
 'Grape___Esca_(Black_Measles)',
 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
 'Grape___healthy',
 'Orange___Haunglongbing_(Citrus_greening)',
 'Peach___Bacterial_spot',
 'Peach___healthy',
 'Pepper,_bell___Bacterial_spot',
 'Pepper,_bell___healthy',
 'Potato___Early_blight',
 'Potato___Late_blight',
 'Potato___healthy',
 'Raspberry___healthy',
 'Soybean___healthy',
 'Squash___Powdery_mildew',
 'Strawberry___Leaf_scorch',
 'Strawberry___healthy',
 'Tomato___Bacterial_spot',
 'Tomato___Early_blight',
 'Tomato___Late_blight',
 'Tomato___Leaf_Mold',
 'Tomato___Septoria_leaf_spot',
 'Tomato___Spider_mites Two-spotted_spider_mite',
 'Tomato___Target_Spot',
 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
 'Tomato___Tomato_mosaic_virus',
 'Tomato___healthy'
]

# DISEASE INFORMATION 
# (Full dictionary will be sent in next message)
from disease_info import disease_info
# You will paste the dictionary inside a file called disease_info.py

# IMAGE PREPROCESSING
def preprocess(image):
    image = image.convert("RGB")
    image = image.resize((128, 128))     
    image = np.array(image).astype("float32")
    image = np.expand_dims(image, axis=0)
    return image
# def preprocess(image):
#     image = image.convert("RGB")
#     image = image.resize((128, 128), Image.LANCZOS)
    
#     # Enhance sharpness & contrast
#     image = ImageEnhance.Sharpness(image).enhance(1.2)
#     image = ImageEnhance.Contrast(image).enhance(1.2)
    
#     # Convert to numpy and normalize
#     img_array = np.array(image).astype("float32") / 255.0
#     img_array = np.expand_dims(img_array, axis=0)
    
#     return img_array
# PREDICTION ROUTE
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file)
    except:
        return {"error": "Invalid image file"}

    img = preprocess(image)
    pred = model.predict(img)
    
    class_idx = int(np.argmax(pred))
    confidence = float(np.max(pred))
    label = class_names[class_idx] # Maps index to class name
    details = disease_info.get(label, {}) 

    return {
        "class_index": class_idx,
        "label": label,
        "confidence": confidence,
        "severity": details.get("severity"),
        "symptoms": details.get("symptoms"),
        "cure": details.get("cure"),
        "recommended_chemicals": details.get("chemicals"),
        "organic_solutions": details.get("organic"),
        "prevention": details.get("prevention")
    }

# ROOT CHECK
@app.get("/")
def home():
    return {"message": "KrishiMitra API is running 🚀"}

# START SERVER
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
