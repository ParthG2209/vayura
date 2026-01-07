from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    DistrictEnvironmentalData,
    OxygenCalculationResult,
    HealthResponse,
)
from calculator import calculate_oxygen_requirements
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Vayura Oxygen Calculator Service",
    description="Microservice for calculating district-level oxygen demand and tree requirements",
    version="1.0.0",
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        service="oxygen-calculator",
        version="1.0.0",
    )


@app.post("/calculate", response_model=OxygenCalculationResult)
async def calculate_oxygen(data: DistrictEnvironmentalData):
    """
    Calculate oxygen demand, deficit, and tree requirements for a district.
    
    Parameters:
    - district_name: Name of the district
    - population: District population
    - aqi: Air Quality Index (0-500)
    - soil_quality: Soil quality index (0-100)
    - disaster_frequency: Disaster frequency score (0-10+)
    
    Returns detailed oxygen calculation with formula breakdown and assumptions.
    """
    try:
        result = calculate_oxygen_requirements(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Calculation error: {str(e)}",
        )


@app.get("/health")
async def health():
    """Alternative health endpoint"""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
