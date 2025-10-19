from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models.recommendation import RecommendationEngine
from models.genai import DescriptionGenerator
import pandas as pd

app = FastAPI(title="Furniture Recommendation API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize
rec_engine = RecommendationEngine()
desc_gen = DescriptionGenerator()
import os
csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'intern_data_ikarus_processed.csv')
df = pd.read_csv(csv_path)


class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.get("/")
def root():
    return {"message": "Furniture API", "status": "running"}

@app.get("/api/recommend")

def get_recommendations(query: str, top_k: int = 5):
    products = rec_engine.get_recommendations(query, top_k)
    
    for product in products:
        product['ai_description'] = desc_gen.generate_description(product)
    
    return {"query": query, "products": products}

@app.post("/api/chat")
def chat(request: ChatRequest):
    products = rec_engine.get_recommendations(request.message, top_k=3)
    return {
        "reply": f"Found {len(products)} options for '{request.message}':",
        "products": products
    }

@app.get("/api/analytics")
def get_analytics():
    valid_prices = df[df['price_numeric'] > 0]['price_numeric']
    
    return {
        "total_products": len(df),
        "avg_price": float(valid_prices.mean()) if len(valid_prices) > 0 else 0,
        "top_brands": df['brand'].value_counts().head(10).to_dict()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
