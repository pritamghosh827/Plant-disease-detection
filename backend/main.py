from fastapi import FastAPI, File, UploadFile
from PIL import Image
import json
import torch
import torchvision.transforms as transforms
import io
from model import CNN_RNN_Hybrid
from deep_translator import GoogleTranslator
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from typing import Dict
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# -------- Load Class Names --------
class_file = os.path.join(os.path.dirname(__file__), "class_names.json")
with open(class_file, "r") as f:
    class_names = json.load(f)
# -------- Load Model (graceful) --------
logger = logging.getLogger("plant-disease-app")
logging.basicConfig(level=logging.INFO)

model = None
model_loaded = False
num_classes = 38   # change according to your dataset
model_path = os.path.join(os.path.dirname(__file__), "cnn_rnn_hybrid_model.pth")
try:
    model = CNN_RNN_Hybrid(num_classes)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    model_loaded = True
    logger.info("Model loaded successfully from %s", model_path)
except Exception as e:
    logger.exception("Failed to load model: %s", e)

# -------- Image Transform --------
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize([0.5,0.5,0.5],[0.5,0.5,0.5])
])

# Example disease solution dictionary
disease_solutions = {
    "Apple___Black_rot": "Remove infected leaves and apply fungicide.",
    "Tomato___Late_blight": "Use copper-based fungicide and improve drainage.",
}

@app.post("/predict/")
async def predict(file: UploadFile = File(...), language: str = "en"):
    if not model_loaded:
        return {"error": "Model not loaded on server. Check server logs."}

    try:
        logger.info("Received predict request: filename=%s, language=%s", getattr(file, 'filename', None), language)

        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        image = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(image)
            _, predicted = torch.max(outputs, 1)

        class_name = class_names[predicted.item()]
        solution = disease_solutions.get(class_name, "Consult agricultural expert.")

        # 🌍 Language Translation
        if language != "en":
            try:
                solution = GoogleTranslator(source='auto', target=language).translate(solution)
            except Exception:
                logger.exception("Translation failed, returning original solution")

        return {
            "disease": class_name,
            "solution": solution
        }
    except Exception as exc:
        logger.exception("Prediction failed: %s", exc)
        return {"error": "Prediction failed on server. Check server logs."}


@app.get("/health")
def health() -> Dict[str, str]:
    """Health endpoint to verify server and model status."""
    return {"status": "ok", "model_loaded": str(model_loaded)}


if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 8000))
    logger.info("Starting server on %s:%s", host, port)
    uvicorn.run("main:app", host=host, port=port, log_level="info")


