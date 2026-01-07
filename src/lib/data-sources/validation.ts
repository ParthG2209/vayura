/**
 * Data Source Validation and Attribution
 * Ensures all data sources are properly validated and attributed
 */

export interface DataSourceInfo {
    name: string;
    type: 'api' | 'government' | 'ai' | 'fallback' | 'estimate';
    url?: string;
    description: string;
    reliability: 'high' | 'medium' | 'low';
    lastUpdated?: string;
    license?: string;
}

export const VALIDATED_DATA_SOURCES: Record<string, DataSourceInfo> = {
    // Primary Sources
    'gemini_ai': {
        name: 'Google Gemini AI',
        type: 'ai',
        url: 'https://ai.google.dev/',
        description: 'AI-powered data aggregation from multiple government sources',
        reliability: 'medium',
        license: 'Google AI Terms of Service',
    },
    'openweathermap': {
        name: 'OpenWeatherMap Air Pollution API',
        type: 'api',
        url: 'https://openweathermap.org/api/air-pollution',
        description: 'Real-time air quality data including AQI and PM2.5',
        reliability: 'high',
        license: 'OpenWeatherMap Terms of Service',
    },
    'census_2021_projection': {
        name: 'Census of India 2021 Projections',
        type: 'government',
        url: 'https://censusindia.gov.in/',
        description: 'Official population data from Government of India Census',
        reliability: 'high',
        lastUpdated: '2021',
        license: 'Public Domain (Government Data)',
    },
    'fsi_isfr_2021': {
        name: 'Forest Survey of India - ISFR 2021',
        type: 'government',
        url: 'https://fsi.nic.in/forest-report-2021',
        description: 'Official forest cover and tree data from Ministry of Environment',
        reliability: 'high',
        lastUpdated: '2021',
        license: 'Public Domain (Government Data)',
    },
    'ndma_published_statistics': {
        name: 'National Disaster Management Authority',
        type: 'government',
        url: 'https://ndma.gov.in/',
        description: 'Official disaster frequency and type data',
        reliability: 'high',
        license: 'Public Domain (Government Data)',
    },
    'nbss_soil_surveys': {
        name: 'ICAR-NBSS&LUP Soil Surveys',
        type: 'government',
        url: 'https://www.nbsslup.in/',
        description: 'Soil quality data from National Bureau of Soil Survey',
        reliability: 'high',
        license: 'Public Domain (Government Data)',
    },
    'soil_health_card_published': {
        name: 'Soil Health Card Scheme',
        type: 'government',
        url: 'https://soilhealth.dac.gov.in/',
        description: 'Published soil health indices from Government of India',
        reliability: 'high',
        license: 'Public Domain (Government Data)',
    },
    'cpcb_published_average': {
        name: 'Central Pollution Control Board',
        type: 'government',
        url: 'https://cpcb.nic.in/',
        description: 'Published AQI averages from CPCB',
        reliability: 'high',
        license: 'Public Domain (Government Data)',
    },
    
    // Fallback Sources
    'estimate': {
        name: 'Statistical Estimate',
        type: 'estimate',
        description: 'Calculated estimate based on regional averages and patterns',
        reliability: 'low',
    },
    'fallback': {
        name: 'Fallback Data',
        type: 'fallback',
        description: 'Default values used when primary sources are unavailable',
        reliability: 'low',
    },
};

/**
 * Validate data source string and return structured info
 */
export function validateDataSource(sourceString: string): DataSourceInfo[] {
    if (!sourceString) {
        return [VALIDATED_DATA_SOURCES['estimate']];
    }

    const sources = sourceString.split(',').map(s => s.trim());
    const validated: DataSourceInfo[] = [];

    for (const source of sources) {
        // Check if it's a known source
        if (VALIDATED_DATA_SOURCES[source]) {
            validated.push(VALIDATED_DATA_SOURCES[source]);
        } else if (source.includes('gemini_ai')) {
            // Parse Gemini AI sources
            const match = source.match(/gemini_ai\s*\(([^)]+)\)/);
            if (match) {
                const geminiSources = match[1].split(',').map(s => s.trim());
                validated.push(VALIDATED_DATA_SOURCES['gemini_ai']);
                // Add referenced sources
                geminiSources.forEach(gs => {
                    if (VALIDATED_DATA_SOURCES[gs.toLowerCase().replace(/\s+/g, '_')]) {
                        validated.push(VALIDATED_DATA_SOURCES[gs.toLowerCase().replace(/\s+/g, '_')]);
                    }
                });
            } else {
                validated.push(VALIDATED_DATA_SOURCES['gemini_ai']);
            }
        } else {
            // Unknown source - use estimate
            validated.push({
                name: source,
                type: 'estimate',
                description: 'Unknown or unverified data source',
                reliability: 'low',
            });
        }
    }

    return validated.length > 0 ? validated : [VALIDATED_DATA_SOURCES['estimate']];
}

/**
 * Format data source for display
 */
export function formatDataSource(sources: DataSourceInfo[]): string {
    if (sources.length === 0) return 'Unknown';
    
    const primary = sources[0];
    if (sources.length === 1) {
        return primary.name;
    }
    
    return `${primary.name} + ${sources.length - 1} more`;
}

/**
 * Get reliability badge color
 */
export function getReliabilityColor(reliability: 'high' | 'medium' | 'low'): string {
    switch (reliability) {
        case 'high':
            return 'text-green-600 bg-green-50';
        case 'medium':
            return 'text-yellow-600 bg-yellow-50';
        case 'low':
            return 'text-red-600 bg-red-50';
        default:
            return 'text-gray-600 bg-gray-50';
    }
}

/**
 * Validate all data sources in environmental data
 */
export function validateEnvironmentalDataSources(dataSourceString?: string): {
    valid: boolean;
    sources: DataSourceInfo[];
    issues: string[];
} {
    const issues: string[] = [];
    const sources = validateDataSource(dataSourceString || '');
    
    // Check for low reliability sources
    const lowReliability = sources.filter(s => s.reliability === 'low');
    if (lowReliability.length > 0) {
        issues.push(`Using ${lowReliability.length} low-reliability source(s)`);
    }
    
    // Check if all sources are estimates
    if (sources.every(s => s.type === 'estimate' || s.type === 'fallback')) {
        issues.push('All data sources are estimates - no verified data available');
    }
    
    return {
        valid: issues.length === 0,
        sources,
        issues,
    };
}

