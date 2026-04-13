from fastapi import FastAPI
from schema import SymptomRequest
from model import get_ai_response
from utils import check_emergency
from utils import check_emergency, format_response
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


@app.post("/analyze")
def analyze(data: SymptomRequest):
    try:
        if check_emergency(data.symptoms):
            return {
                "conditions": [],
                "urgency": "HIGH",
                "steps": ["Seek immediate medical attention"],
                "disclaimer": "This is not medical advice."
            }

        raw_result = get_ai_response(data.symptoms)
        print("RAW AI:", raw_result)

        formatted = format_response(raw_result)

        formatted["disclaimer"] = "This is not medical advice."

        return formatted

    except Exception as e:
        return {"error": str(e)}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)