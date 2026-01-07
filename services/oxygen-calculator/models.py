from pydantic import BaseModel, Field
from typing import Optional


class DistrictEnvironmentalData(BaseModel):
    """Input data for oxygen calculation"""
    district_name: str
    population: int = Field(gt=0, description="District population")
    aqi: float = Field(ge=0, le=500, description="Air Quality Index")
    soil_quality: float = Field(ge=0, le=100, description="Soil quality index (0-100)")
    disaster_frequency: float = Field(ge=0, description="Disaster frequency score")


class FormulaBreakdown(BaseModel):
    """Detailed formula breakdown for transparency"""
    human_o2_demand_liters: float
    human_o2_demand_kg: float
    aqi_penalty_factor: float
    soil_degradation_factor: float
    disaster_loss_factor: float
    total_penalty: float
    adjusted_o2_demand_kg: float
    per_tree_o2_supply_kg: float
    soil_adjusted_tree_supply_kg: float


class OxygenCalculationResult(BaseModel):
    """Complete oxygen calculation result"""
    district_name: str
    population: int
    
    # Demand
    human_o2_demand_kg_per_year: float
    penalty_adjusted_demand_kg_per_year: float
    
    # Supply (if we had trees)
    per_tree_o2_supply_kg_per_year: float
    
    # Deficit
    oxygen_deficit_kg_per_year: float
    
    # Trees required
    trees_required: int
    trees_required_hectares: float  # Approx land area needed
    
    # Transparency
    formula_breakdown: FormulaBreakdown
    assumptions: list[str]
    confidence_level: str  # "high", "medium", "low"
    data_sources: list[str]


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    service: str
    version: str
