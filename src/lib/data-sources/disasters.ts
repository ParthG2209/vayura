/**
 * Disaster frequency data source
 * Uses Gemini AI and NDMA published statistics
 */

import { DISASTER_FREQUENCY_DATA } from './alternative-apis';

interface DisasterData {
    disasterFrequency: number; // 0-10+ scale
    commonDisasters: string[];
    source: string;
}

// Fallback disaster frequency data based on historical patterns
// Scale: 0 (very low) to 10+ (very high)
const fallbackDisasterData: Record<string, { frequency: number; types: string[] }> = {
    'bangalore-urban': { frequency: 2.1, types: ['Urban flooding'] },
    'mumbai-city': { frequency: 5.8, types: ['Monsoon flooding', 'Cyclones'] },
    'delhi': { frequency: 3.2, types: ['Floods', 'Air pollution events'] },
    'pune': { frequency: 3.5, types: ['Floods', 'Droughts'] },
    'hyderabad': { frequency: 3.8, types: ['Floods', 'Droughts'] },
    'chennai': { frequency: 6.2, types: ['Floods', 'Cyclones', 'Storm surge'] },
    'kolkata': { frequency: 5.5, types: ['Cyclones', 'Floods'] },
    'jaipur': { frequency: 2.8, types: ['Droughts', 'Heat waves'] },
    'lucknow': { frequency: 4.1, types: ['Floods', 'Droughts'] },
    'ahmedabad': { frequency: 3.4, types: ['Earthquakes', 'Heat waves'] },
};

export async function getDisasterData(districtSlug: string, districtName?: string, stateName?: string): Promise<DisasterData> {
    // Try Gemini AI first
    if (districtName && stateName) {
        try {
            const { fetchDistrictDataWithGemini, validateGeminiData } = await import('./gemini-data-fetcher');
            const geminiData = await fetchDistrictDataWithGemini({
                districtName,
                stateName,
                dataType: 'disasters',
            });

            if (geminiData && geminiData.disasterFrequency && geminiData.commonDisasters) {
                const validation = validateGeminiData(geminiData);
                if (validation.valid) {
                    return {
                        disasterFrequency: geminiData.disasterFrequency,
                        commonDisasters: geminiData.commonDisasters,
                        source: `gemini_ai (${geminiData.sources?.join(', ') || 'ndma data'})`,
                    };
                }
            }
        } catch (error) {
            console.error('Gemini AI fetch failed:', error);
        }
    }

    // Fallback to NDMA published statistics
    const publishedData = DISASTER_FREQUENCY_DATA[districtSlug as keyof typeof DISASTER_FREQUENCY_DATA];
    const data = publishedData || fallbackDisasterData[districtSlug] || { frequency: 3.0, types: ['Various'] };

    return {
        disasterFrequency: data.frequency,
        commonDisasters: data.types,
        source: publishedData ? 'ndma_published_statistics' : 'estimate',
    };
}
