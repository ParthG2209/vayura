# Oxygen Calculator Service

Python FastAPI microservice for calculating district-level oxygen demand and tree requirements. This service provides the core calculation logic for Vayura.

## Overview

This microservice calculates:
- Human oxygen demand based on population and environmental factors
- Penalty factors for AQI, soil quality, and disaster frequency
- Tree requirements to offset oxygen deficit
- Detailed formula breakdowns and assumptions

## Installation

```bash
cd services/oxygen-calculator
pip install -r requirements.txt
```

## Running the Service

### Development Mode

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The service will be available at `http://localhost:8000`

## API Endpoints

### POST /calculate

Calculate oxygen requirements for a district.

**Request Body:**
```json
{
  "district_name": "Bangalore Urban",
  "population": 12765000,
  "aqi": 156.5,
  "soil_quality": 65.0,
  "disaster_frequency": 3.2
}
```

**Response:**
```json
{
  "district_name": "Bangalore Urban",
  "population": 12765000,
  "human_o2_demand_kg_per_year": 371234567.89,
  "penalty_adjusted_demand_kg_per_year": 483456789.12,
  "per_tree_o2_supply_kg_per_year": 71.5,
  "oxygen_deficit_kg_per_year": 483456789.12,
  "trees_required": 6762345,
  "trees_required_hectares": 16905.86,
  "formula_breakdown": {
    "base_demand": 371234567.89,
    "aqi_penalty": 1.3,
    "soil_penalty": 1.2,
    "disaster_penalty": 1.1,
    "adjusted_demand": 483456789.12
  },
  "assumptions": [
    "Human O₂ consumption: 550 L/day per person",
    "Tree O₂ production: 110 kg/year per mature tree",
    "Average tree lifespan: 50 years"
  ],
  "confidence_level": "high",
  "data_sources": ["Census 2021", "OpenWeatherMap API"]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

## Calculation Formula

The calculation follows this transparent formula:

### 1. Base Human O₂ Demand

```
Population × 550 L/day × 365 days
Convert to kg using O₂ density (1.429 g/L)
```

### 2. Penalty Factors

- **AQI Factor**: Higher pollution increases respiratory demand (1.0 - 1.75×)
- **Soil Degradation Factor**: Poor soil = less natural O₂ sources (1.0 - 1.6×)
- **Disaster Loss Factor**: Frequent disasters destroy vegetation (1.05 - 1.5×)

### 3. Adjusted Demand

```
Base demand × AQI factor × Soil factor × Disaster factor
```

### 4. Tree O₂ Supply

- Base: 110 kg/year per mature tree
- Adjusted by soil quality (better soil = healthier trees)
- Formula: `110 × (soil_quality / 100)`

### 5. Trees Required

```
Oxygen Deficit ÷ Adjusted tree supply
```

## Scientific References

- **Human O₂ consumption**: WHO respiratory health standards (550 L/day)
- **Tree O₂ production**: USDA Forest Service research (110 kg/year per mature tree)
- **AQI categories**: EPA Air Quality Index standards

## Development

### Project Structure

```
oxygen-calculator/
├── main.py           # FastAPI application
├── calculator.py    # Core calculation logic
├── models.py        # Pydantic models
├── requirements.txt # Python dependencies
└── README.md        # This file
```

### Adding New Features

1. Update `models.py` for new request/response models
2. Add calculation logic to `calculator.py`
3. Add new endpoints to `main.py`
4. Update this README with new endpoints

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Contributing

This is part of the Vayura open-source project. See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT License - See main [LICENSE](../../LICENSE) file.
