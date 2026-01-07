import numpy as np
from models import DistrictEnvironmentalData, OxygenCalculationResult, FormulaBreakdown


# Constants based on scientific research
HUMAN_O2_CONSUMPTION_LITERS_PER_DAY = 550  # Average adult oxygen consumption
LITERS_TO_KG_O2_CONVERSION = 1.429 / 1000  # Oxygen density at STP (kg/L)
DAYS_PER_YEAR = 365
BASE_TREE_O2_SUPPLY_KG_PER_YEAR = 110  # Mature tree oxygen production
TREES_PER_HECTARE = 400  # Typical plantation density


def calculate_aqi_penalty_factor(aqi: float) -> float:
    """
    Calculate oxygen demand penalty based on AQI.
    Higher AQI = more pollution = more health stress = higher O2 demand
    
    AQI Categories:
    0-50: Good (no penalty)
    51-100: Moderate (5% increase)
    101-150: Unhealthy for sensitive (15% increase)
    151-200: Unhealthy (30% increase)
    201-300: Very unhealthy (50% increase)
    300+: Hazardous (75% increase)
    """
    if aqi <= 50:
        return 1.0
    elif aqi <= 100:
        return 1.05
    elif aqi <= 150:
        return 1.15
    elif aqi <= 200:
        return 1.30
    elif aqi <= 300:
        return 1.50
    else:
        return 1.75


def calculate_soil_degradation_factor(soil_quality: float) -> float:
    """
    Calculate impact of soil degradation on oxygen balance.
    Poor soil = less vegetation = less natural O2 production = higher effective demand
    
    Soil Quality (0-100):
    80-100: Excellent (no penalty)
    60-79: Good (10% increase)
    40-59: Moderate (25% increase)
    20-39: Poor (40% increase)
    0-19: Very poor (60% increase)
    """
    if soil_quality >= 80:
        return 1.0
    elif soil_quality >= 60:
        return 1.10
    elif soil_quality >= 40:
        return 1.25
    elif soil_quality >= 20:
        return 1.40
    else:
        return 1.60


def calculate_disaster_loss_factor(disaster_frequency: float) -> float:
    """
    Calculate environmental loss due to disasters.
    Frequent disasters = vegetation loss = reduced oxygen sources
    
    Disaster Frequency Score (0-10):
    0-2: Low (5% increase)
    2-5: Moderate (15% increase)
    5-8: High (30% increase)
    8+: Very high (50% increase)
    """
    if disaster_frequency <= 2:
        return 1.05
    elif disaster_frequency <= 5:
        return 1.15
    elif disaster_frequency <= 8:
        return 1.30
    else:
        return 1.50


def calculate_soil_tree_adjustment(soil_quality: float) -> float:
    """
    Adjust tree oxygen production based on soil quality.
    Better soil = healthier trees = more oxygen production
    """
    # Linear scaling: 100% soil quality = 100% O2 production
    # 50% soil quality = 70% O2 production (minimum viable)
    return max(0.7, soil_quality / 100)


def calculate_oxygen_requirements(data: DistrictEnvironmentalData) -> OxygenCalculationResult:
    """
    Main calculation function for district oxygen demand and tree requirements.
    
    Formula:
    1. Base human O2 demand = population × daily O2 consumption × days/year
    2. Apply penalty factors (AQI, soil, disasters)
    3. Calculate tree O2 supply (adjusted for soil quality)
    4. Determine deficit and trees needed
    """
    
    # Step 1: Calculate base human oxygen demand
    human_o2_liters_per_day = data.population * HUMAN_O2_CONSUMPTION_LITERS_PER_DAY
    human_o2_liters_per_year = human_o2_liters_per_day * DAYS_PER_YEAR
    human_o2_kg_per_year = human_o2_liters_per_year * LITERS_TO_KG_O2_CONVERSION
    
    # Step 2: Calculate penalty factors
    aqi_factor = calculate_aqi_penalty_factor(data.aqi)
    soil_factor = calculate_soil_degradation_factor(data.soil_quality)
    disaster_factor = calculate_disaster_loss_factor(data.disaster_frequency)
    
    # Combined penalty (multiplicative)
    total_penalty = aqi_factor * soil_factor * disaster_factor
    
    # Adjusted oxygen demand
    adjusted_o2_demand = human_o2_kg_per_year * total_penalty
    
    # Step 3: Calculate tree oxygen supply (adjusted for soil)
    soil_adjustment = calculate_soil_tree_adjustment(data.soil_quality)
    adjusted_tree_o2_supply = BASE_TREE_O2_SUPPLY_KG_PER_YEAR * soil_adjustment
    
    # Step 4: Calculate deficit and trees required
    # Note: We assume zero current tree coverage for conservative estimate
    oxygen_deficit = adjusted_o2_demand
    trees_required = int(np.ceil(oxygen_deficit / adjusted_tree_o2_supply))
    trees_required_hectares = trees_required / TREES_PER_HECTARE
    
    # Determine confidence level based on data quality
    confidence_level = determine_confidence_level(data)
    
    # Create formula breakdown for transparency
    formula_breakdown = FormulaBreakdown(
        human_o2_demand_liters=human_o2_liters_per_year,
        human_o2_demand_kg=human_o2_kg_per_year,
        aqi_penalty_factor=aqi_factor,
        soil_degradation_factor=soil_factor,
        disaster_loss_factor=disaster_factor,
        total_penalty=total_penalty,
        adjusted_o2_demand_kg=adjusted_o2_demand,
        per_tree_o2_supply_kg=BASE_TREE_O2_SUPPLY_KG_PER_YEAR,
        soil_adjusted_tree_supply_kg=adjusted_tree_o2_supply,
    )
    
    # Build assumptions list
    assumptions = [
        f"Average human O2 consumption: {HUMAN_O2_CONSUMPTION_LITERS_PER_DAY} L/day",
        f"Mature tree O2 production: {BASE_TREE_O2_SUPPLY_KG_PER_YEAR} kg/year",
        "Calculations assume no existing tree coverage (conservative estimate)",
        "Tree plantation density: 400 trees per hectare",
        "O2 demand penalties based on AQI, soil quality, and disaster frequency",
    ]
    
    # Data sources
    data_sources = [
        "WHO: Human oxygen consumption standards",
        "USDA Forest Service: Tree oxygen production research",
        "EPA: Air Quality Index categories",
    ]
    
    return OxygenCalculationResult(
        district_name=data.district_name,
        population=data.population,
        human_o2_demand_kg_per_year=round(human_o2_kg_per_year, 2),
        penalty_adjusted_demand_kg_per_year=round(adjusted_o2_demand, 2),
        per_tree_o2_supply_kg_per_year=round(adjusted_tree_o2_supply, 2),
        oxygen_deficit_kg_per_year=round(oxygen_deficit, 2),
        trees_required=trees_required,
        trees_required_hectares=round(trees_required_hectares, 2),
        formula_breakdown=formula_breakdown,
        assumptions=assumptions,
        confidence_level=confidence_level,
        data_sources=data_sources,
    )


def determine_confidence_level(data: DistrictEnvironmentalData) -> str:
    """
    Determine confidence level based on data quality and ranges.
    """
    # High confidence: typical ranges
    # Medium: some outliers
    # Low: multiple outliers or extreme values
    
    issues = 0
    
    # Check for typical population ranges (1000 - 20M for districts)
    if data.population < 1000 or data.population > 20_000_000:
        issues += 1
    
    # Check AQI (typical Indian cities: 50-300)
    if data.aqi > 400:
        issues += 1
    
    # Check soil quality
    if data.soil_quality < 20:
        issues += 1
    
    # Check disaster frequency
    if data.disaster_frequency > 9:
        issues += 1
    
    if issues == 0:
        return "high"
    elif issues <= 2:
        return "medium"
    else:
        return "low"
