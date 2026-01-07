/**
 * Gemini AI-Powered Data Fetcher
 * Uses Google Gemini API (free tier) to fetch and structure district data
 * from various sources including government portals and public information
 */

interface GeminiConfig {
    apiKey: string;
    model: string;
}

const config: GeminiConfig = {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-1.5-flash', // Free tier model - try without -latest suffix
};

interface DistrictDataRequest {
    districtName: string;
    stateName: string;
    dataType: 'population' | 'air_quality' | 'soil_quality' | 'disasters' | 'all';
}

interface GeminiDistrictData {
    population?: number;
    populationYear?: number;
    aqi?: number;
    pm25?: number;
    soilQuality?: number;
    disasterFrequency?: number;
    commonDisasters?: string[];
    sources?: string[];
    confidence?: 'high' | 'medium' | 'low';
}

/**
 * Fetch district data using Gemini AI
 */
export async function fetchDistrictDataWithGemini(
    request: DistrictDataRequest
): Promise<GeminiDistrictData | null> {
    if (!config.apiKey) {
        console.warn('GEMINI_API_KEY not configured');
        return null;
    }

    try {
        const prompt = buildPrompt(request);
        
        // Use v1 API (v1beta may not support all models)
        const apiVersion = 'v1';
        const modelName = 'gemini-1.5-flash'; // Use explicit model name
        const response = await fetch(
            `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${config.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.1, // Low temperature for factual data
                        topK: 1,
                        topP: 1,
                        maxOutputTokens: 2048,
                    },
                }),
                next: { revalidate: 86400 } // Cache for 24 hours
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: errorText };
            }
            console.error('Gemini API error:', response.status, errorData);
            
            // If model not found, the API will fallback to other data sources
            // Don't throw, just return null to allow fallback
            return null;
        }

        const data = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text;
        
        if (!text) {
            return null;
        }

        // Parse JSON response from Gemini
        return parseGeminiResponse(text);
    } catch (error) {
        console.error('Error fetching data with Gemini:', error);
        return null;
    }
}

/**
 * Build prompt for Gemini based on data type
 */
function buildPrompt(request: DistrictDataRequest): string {
    const { districtName, stateName, dataType } = request;

    const basePrompt = `You are a data assistant for Indian government statistics. Provide accurate, verified data for ${districtName} district in ${stateName} state, India.

IMPORTANT: 
- Only provide data from official sources (Census India, CPCB, government portals)
- If exact data is unavailable, provide the most recent estimate with a note
- Return data in strict JSON format
- Include source references
- Be factual and precise

`;

    const prompts: Record<string, string> = {
        population: `${basePrompt}
Task: Provide the current population data for ${districtName}, ${stateName}.

Required data:
1. Total population (from Census 2021 or latest projection)
2. Year of data
3. Source (e.g., "Census 2021")

Return JSON:
{
  "population": <number>,
  "populationYear": <year>,
  "sources": ["source name"],
  "confidence": "high|medium|low"
}`,

        air_quality: `${basePrompt}
Task: Provide air quality data for ${districtName}, ${stateName}.

Required data:
1. Air Quality Index (AQI) - annual average
2. PM2.5 levels if available
3. Source (CPCB, state pollution board, etc.)

Return JSON:
{
  "aqi": <number>,
  "pm25": <number or null>,
  "sources": ["source name"],
  "confidence": "high|medium|low"
}`,

        soil_quality: `${basePrompt}
Task: Provide soil quality data for ${districtName}, ${stateName}.

Required data:
1. Soil quality index (0-100 scale, where 100 is excellent)
2. Based on organic carbon, pH, and agricultural productivity
3. Source (Soil Health Card, agricultural reports)

Return JSON:
{
  "soilQuality": <number>,
  "sources": ["source name"],
  "confidence": "high|medium|low"
}`,

        disasters: `${basePrompt}
Task: Provide natural disaster data for ${districtName}, ${stateName}.

Required data:
1. Disaster frequency (0-10 scale, average disasters per year over last 10 years)
2. Common disaster types (floods, droughts, earthquakes, cyclones, etc.)
3. Source (NDMA, state disaster management)

Return JSON:
{
  "disasterFrequency": <number>,
  "commonDisasters": ["type1", "type2"],
  "sources": ["source name"],
  "confidence": "high|medium|low"
}`,

        all: `${basePrompt}
Task: Provide comprehensive environmental and demographic data for ${districtName}, ${stateName}.

Required data:
1. Population (Census 2021 or latest)
2. Air Quality Index (AQI) - annual average
3. Soil quality index (0-100)
4. Disaster frequency (0-10 scale)
5. Common disaster types
6. Sources for all data points

Return JSON:
{
  "population": <number>,
  "populationYear": <year>,
  "aqi": <number>,
  "pm25": <number or null>,
  "soilQuality": <number>,
  "disasterFrequency": <number>,
  "commonDisasters": ["type1", "type2"],
  "sources": ["source1", "source2"],
  "confidence": "high|medium|low"
}`,
    };

    return prompts[dataType] || prompts.all;
}

/**
 * Parse Gemini's JSON response
 */
function parseGeminiResponse(text: string): GeminiDistrictData | null {
    try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                         text.match(/(\{[\s\S]*\})/);
        
        if (!jsonMatch) {
            console.error('No JSON found in Gemini response');
            return null;
        }

        const jsonStr = jsonMatch[1];
        const parsed = JSON.parse(jsonStr);

        return {
            population: parsed.population,
            populationYear: parsed.populationYear,
            aqi: parsed.aqi,
            pm25: parsed.pm25,
            soilQuality: parsed.soilQuality,
            disasterFrequency: parsed.disasterFrequency,
            commonDisasters: parsed.commonDisasters,
            sources: parsed.sources,
            confidence: parsed.confidence || 'medium',
        };
    } catch (error) {
        console.error('Error parsing Gemini response:', error);
        console.error('Response text:', text);
        return null;
    }
}

/**
 * Fetch all district data at once using Gemini
 */
export async function fetchCompleteDistrictData(
    districtName: string,
    stateName: string
): Promise<GeminiDistrictData | null> {
    return fetchDistrictDataWithGemini({
        districtName,
        stateName,
        dataType: 'all',
    });
}

/**
 * Validate and normalize Gemini data
 */
export function validateGeminiData(data: GeminiDistrictData): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // Validate population
    if (data.population !== undefined) {
        if (data.population < 1000 || data.population > 50000000) {
            errors.push('Population out of reasonable range');
        }
    }

    // Validate AQI
    if (data.aqi !== undefined) {
        if (data.aqi < 0 || data.aqi > 500) {
            errors.push('AQI out of valid range (0-500)');
        }
    }

    // Validate soil quality
    if (data.soilQuality !== undefined) {
        if (data.soilQuality < 0 || data.soilQuality > 100) {
            errors.push('Soil quality out of valid range (0-100)');
        }
    }

    // Validate disaster frequency
    if (data.disasterFrequency !== undefined) {
        if (data.disasterFrequency < 0 || data.disasterFrequency > 20) {
            errors.push('Disaster frequency out of reasonable range');
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

