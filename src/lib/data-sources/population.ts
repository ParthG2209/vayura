/**
 * Population data source with Gemini AI and Census 2021 data
 * Uses AI to fetch latest government published data
 */

import { CENSUS_2021_DISTRICT_POPULATION } from './alternative-apis';

interface PopulationData {
    population: number;
    year: number;
    source: string;
}

// Fallback population data for development
// These are approximate 2024 estimates for major Indian districts
const fallbackPopulationData: Record<string, number> = {
    'bangalore-urban': 12765000,
    'mumbai-city': 12442373,
    'delhi': 16787941,
    'pune': 7427000,
    'hyderabad': 10456000,
    'chennai': 10971000,
    'kolkata': 14850000,
    'jaipur': 3073350,
    'lucknow': 2817105,
    'ahmedabad': 8450000,
};

export async function getPopulationData(districtSlug: string, districtName?: string, stateName?: string): Promise<PopulationData> {
    // Try Gemini AI first
    if (districtName && stateName) {
        try {
            const { fetchDistrictDataWithGemini, validateGeminiData } = await import('./gemini-data-fetcher');
            const geminiData = await fetchDistrictDataWithGemini({
                districtName,
                stateName,
                dataType: 'population',
            });

            if (geminiData && geminiData.population) {
                const validation = validateGeminiData(geminiData);
                if (validation.valid) {
                    return {
                        population: geminiData.population,
                        year: geminiData.populationYear || 2021,
                        source: `gemini_ai (${geminiData.sources?.join(', ') || 'census data'})`,
                    };
                }
            }
        } catch (error) {
            console.error('Gemini AI fetch failed:', error);
        }
    }

    // Fallback to Census 2021 projections (official government data)
    const censusPopulation = CENSUS_2021_DISTRICT_POPULATION[districtSlug as keyof typeof CENSUS_2021_DISTRICT_POPULATION];
    const population = censusPopulation || fallbackPopulationData[districtSlug] || 1000000;

    return {
        population,
        year: 2021,
        source: censusPopulation ? 'census_2021_projection' : 'estimate',
    };
}
