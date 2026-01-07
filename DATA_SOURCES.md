# Data Sources Validation - Vayura

## Validated Data Sources

All data sources used in Vayura are validated and properly attributed. This document provides transparency about where our data comes from.

---

## Primary Data Sources

### 1. **Google Gemini AI** (Primary Aggregator)
- **Type**: AI-Powered Data Aggregation
- **URL**: https://ai.google.dev/
- **Reliability**: Medium
- **Description**: Uses AI to intelligently fetch and structure data from multiple government sources
- **License**: Google AI Terms of Service
- **Usage**: Primary source for population, AQI, soil quality, and disaster data

### 2. **OpenWeatherMap Air Pollution API**
- **Type**: Real-time API
- **URL**: https://openweathermap.org/api/air-pollution
- **Reliability**: High
- **Description**: Real-time air quality data including AQI and PM2.5 levels
- **License**: OpenWeatherMap Terms of Service
- **Usage**: Secondary source for AQI when Gemini AI is unavailable

### 3. **Census of India 2021**
- **Type**: Government Data
- **URL**: https://censusindia.gov.in/
- **Reliability**: High
- **Description**: Official population data from Government of India
- **License**: Public Domain (Government Data)
- **Last Updated**: 2021
- **Usage**: Fallback for population data

### 4. **Forest Survey of India (FSI) - ISFR 2021**
- **Type**: Government Data
- **URL**: https://fsi.nic.in/forest-report-2021
- **Reliability**: High
- **Description**: Official forest cover and tree data from Ministry of Environment
- **License**: Public Domain (Government Data)
- **Last Updated**: 2021
- **Usage**: Forest cover and tree count estimates

### 5. **National Disaster Management Authority (NDMA)**
- **Type**: Government Data
- **URL**: https://ndma.gov.in/
- **Reliability**: High
- **Description**: Official disaster frequency and type data
- **License**: Public Domain (Government Data)
- **Usage**: Disaster frequency statistics

### 6. **Central Pollution Control Board (CPCB)**
- **Type**: Government Data
- **URL**: https://cpcb.nic.in/
- **Reliability**: High
- **Description**: Published AQI averages
- **License**: Public Domain (Government Data)
- **Usage**: AQI fallback data

### 7. **ICAR-NBSS&LUP (Soil Surveys)**
- **Type**: Government Data
- **URL**: https://www.nbsslup.in/
- **Reliability**: High
- **Description**: Soil quality data from National Bureau of Soil Survey
- **License**: Public Domain (Government Data)
- **Usage**: Soil quality indices

### 8. **Soil Health Card Scheme**
- **Type**: Government Data
- **URL**: https://soilhealth.dac.gov.in/
- **Reliability**: High
- **Description**: Published soil health indices from Government of India
- **License**: Public Domain (Government Data)
- **Usage**: Soil quality fallback data

---

## Data Source Priority

For each data type, sources are tried in this order:

### **Population**
1. Gemini AI (aggregates from Census, state portals)
2. Census 2021 projections (official)
3. Statistical estimates (fallback)

### **Air Quality (AQI)**
1. Gemini AI (aggregates from CPCB, state pollution boards)
2. OpenWeatherMap API (real-time)
3. CPCB published averages (fallback)
4. Statistical estimates (fallback)

### **Soil Quality**
1. Gemini AI (aggregates from NBSS, Soil Health Cards)
2. Soil Health Card published indices (official)
3. Statistical estimates (fallback)

### **Disaster Frequency**
1. Gemini AI (aggregates from NDMA, state disaster management)
2. NDMA published statistics (official)
3. Statistical estimates (fallback)

### **Forest/Tree Data**
1. Forest Survey of India - ISFR 2021 (official)
2. Calculated estimates from forest cover area

---

## Scientific References

### **Oxygen Calculations**
- **Human O₂ Consumption**: WHO Respiratory Health Standards (550 L/day)
- **Tree O₂ Production**: USDA Forest Service Research (110 kg/year per mature tree)
- **AQI Categories**: EPA Air Quality Index standards

### **Research Papers**
1. McPherson, E.G., et al. (2007). "Quantifying urban forest structure, function, and value"
2. Nowak, D.J., et al. (2007). "Oxygen production by urban trees in the United States"
3. WHO Air Quality Guidelines (2021)

---

## Data Reliability Levels

### **High Reliability**
- Government published data (Census, FSI, NDMA, CPCB)
- Real-time API data (OpenWeatherMap)
- Official statistics

### **Medium Reliability**
- AI-aggregated data (Gemini AI)
- Data from multiple sources combined
- May include some interpretation

### **Low Reliability**
- Statistical estimates
- Fallback data
- Calculated approximations

---

## Data Attribution

All data sources are:
1. **Stored** in the `dataSource` field of environmental data
2. **Validated** using `src/lib/data-sources/validation.ts`
3. **Displayed** in the UI with reliability badges
4. **Documented** in this file

---

## Data Refresh

- **Real-time**: AQI (OpenWeatherMap) - Updated hourly
- **Daily**: Environmental data cached for 24 hours
- **Biennial**: Forest data (FSI) - Updated every 2 years
- **Decennial**: Population (Census) - Updated every 10 years

---

## Validation Status

All data sources are:
- Properly attributed
- Validated for reliability
- Documented with URLs
- Displayed in UI with badges
- Fallback chains established

---

**Last Updated**: January 2026  
**Validation Status**: All sources validated

---

## Contributing Data Sources

If you have access to additional government data sources or APIs that could improve Vayura's accuracy, please:

1. Open a [GitHub Issue](https://github.com/manasdutta04/vayura/issues) with the data source details
2. Or submit a Pull Request with the integration

We welcome contributions that help make Vayura's data more accurate and comprehensive.

## References

- [Census of India](https://censusindia.gov.in/)
- [Forest Survey of India](https://fsi.nic.in/)
- [National Disaster Management Authority](https://ndma.gov.in/)
- [Central Pollution Control Board](https://cpcb.nic.in/)
- [ICAR-NBSS&LUP](https://www.nbsslup.in/)
- [Google Gemini AI](https://ai.google.dev/)
- [OpenWeatherMap](https://openweathermap.org/)

---

**This documentation is part of the Vayura open-source project.**

