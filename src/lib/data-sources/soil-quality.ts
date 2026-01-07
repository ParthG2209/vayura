/**
 * Soil quality data source
 * Uses Gemini AI and Soil Health Card published data
 */

import { SOIL_HEALTH_INDICES } from './alternative-apis';

interface SoilQualityData {
    soilQuality: number; // 0-100 scale
    organicCarbon?: number;
    vegetation?: number;
    source: string;
}

// Fallback soil quality estimates for different districts
// Based on general agricultural and urban characteristics
const fallbackSoilQuality: Record<string, number> = {
    'bangalore-urban': 58, // Moderate - urban development impact
    'mumbai-city': 42,     // Poor - heavily urbanized
    'delhi': 48,           // Poor - high urbanization
    'pune': 62,            // Moderate - some green cover
    'hyderabad': 55,       // Moderate
    'chennai': 51,         // Moderate - coastal influence
    'kolkata': 60,         // Moderate - delta region
    'jaipur': 47,          // Poor - arid region
    'lucknow': 65,         // Good - agricultural region
    'ahmedabad': 45,       // Poor - arid, urbanized
};

export async function getSoilQualityData(districtSlug: string, districtName?: string, stateName?: string): Promise<SoilQualityData> {
    // Try Gemini AI first
    if (districtName && stateName) {
        try {
            const { fetchDistrictDataWithGemini, validateGeminiData } = await import('./gemini-data-fetcher');
            const geminiData = await fetchDistrictDataWithGemini({
                districtName,
                stateName,
                dataType: 'soil_quality',
            });

            if (geminiData && geminiData.soilQuality) {
                const validation = validateGeminiData(geminiData);
                if (validation.valid) {
                    return {
                        soilQuality: geminiData.soilQuality,
                        source: `gemini_ai (${geminiData.sources?.join(', ') || 'soil health data'})`,
                    };
                }
            }
        } catch (error) {
            console.error('Gemini AI fetch failed:', error);
        }
    }

    // Fallback to Soil Health Card published indices
    const publishedIndex = SOIL_HEALTH_INDICES[districtSlug as keyof typeof SOIL_HEALTH_INDICES];
    const soilQuality = publishedIndex || fallbackSoilQuality[districtSlug] || 50;

    return {
        soilQuality,
        source: publishedIndex ? 'soil_health_card_published' : 'estimate',
    };
}
