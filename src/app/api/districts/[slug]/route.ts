import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getAQIData } from '@/lib/data-sources/air-quality';
import { getSoilQualityData } from '@/lib/data-sources/soil-quality';
import { getDisasterData } from '@/lib/data-sources/disasters';
import { DistrictDetail, EnvironmentalData, OxygenCalculation } from '@/lib/types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function timestampToDate(value: any): Date {
    if (!value) return new Date();
    if (typeof value.toDate === 'function') return value.toDate();
    return value instanceof Date ? value : new Date(value);
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        if (!slug) {
            return NextResponse.json(
                { error: 'District slug is required' },
                { status: 400 }
            );
        }

        // Fetch district by slug
        const districtsRef = adminDb.collection('districts');
        const districtSnap = await districtsRef.where('slug', '==', slug).limit(1).get();

        if (districtSnap.empty) {
            return NextResponse.json(
                { error: 'District not found' },
                { status: 404 }
            );
        }

        const districtDoc = districtSnap.docs[0];
        const district = { id: districtDoc.id, ...(districtDoc.data() as any) };

        // Fetch latest environmental data (cached 24h)
        // Get all env data for this district and sort in memory to avoid index requirement
        const envRef = adminDb.collection('environmental_data');
        const envSnap = await envRef
            .where('districtId', '==', district.id)
            .get();

        let envData: EnvironmentalData | null = null;
        const now = Date.now();

        if (!envSnap.empty) {
            // Sort by timestamp in memory (newest first)
            const sortedDocs = envSnap.docs.sort((a, b) => {
                const aTime = a.data().timestamp?.toDate?.() || a.data().timestamp || new Date(0);
                const bTime = b.data().timestamp?.toDate?.() || b.data().timestamp || new Date(0);
                return new Date(bTime).getTime() - new Date(aTime).getTime();
            });
            
            const envDoc = sortedDocs[0];
            const data = envDoc.data();
            envData = {
                id: envDoc.id,
                ...data,
                timestamp: timestampToDate(data.timestamp),
                createdAt: timestampToDate(data.createdAt),
            } as EnvironmentalData;
        }

        const isStale = !envData || (now - envData.timestamp.getTime() > ONE_DAY_MS);

        if (isStale) {
            const [aqiData, soilData, disasterData] = await Promise.all([
                getAQIData(district.latitude, district.longitude, district.slug, district.name, district.state),
                getSoilQualityData(district.slug, district.name, district.state),
                getDisasterData(district.slug, district.name, district.state),
            ]);

            const newEnvRef = adminDb.collection('environmental_data').doc();
            await newEnvRef.set({
                    districtId: district.id,
                    aqi: aqiData.aqi,
                    pm25: aqiData.pm25,
                    soilQuality: soilData.soilQuality,
                    disasterFrequency: disasterData.disasterFrequency,
                    dataSource: `${aqiData.source},${soilData.source},${disasterData.source}`,
                timestamp: new Date(),
                createdAt: new Date(),
            });

            envData = {
                id: newEnvRef.id,
                districtId: district.id,
                aqi: aqiData.aqi,
                pm25: aqiData.pm25,
                soilQuality: soilData.soilQuality,
                disasterFrequency: disasterData.disasterFrequency,
                dataSource: `${aqiData.source},${soilData.source},${disasterData.source}`,
                timestamp: new Date(),
                createdAt: new Date(),
            };
        }

        if (!envData) {
            return NextResponse.json(
                { error: 'Environmental data unavailable' },
                { status: 503 }
            );
        }

        // Call Python calculation service
        const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
        let oxygenCalculation: OxygenCalculation;

            const calcResponse = await fetch(`${pythonServiceUrl}/calculate`, {
                method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    district_name: district.name,
                    population: district.population,
                    aqi: envData.aqi,
                    soil_quality: envData.soilQuality,
                    disaster_frequency: envData.disasterFrequency,
                }),
                cache: 'no-store',
            });

            if (!calcResponse.ok) {
            return NextResponse.json(
                { error: 'Oxygen calculation service unavailable' },
                { status: 503 }
            );
        }

        oxygenCalculation = await calcResponse.json();

        // Fetch district-level tree contributions
        const contributionsRef = adminDb.collection('tree_contributions');
        const contributionsSnap = await contributionsRef
            .where('districtId', '==', district.id)
            .where('status', '==', 'VERIFIED')
            .get();

        const totalTreesPlanted = contributionsSnap.size; // Each verified contribution = 1 tree

        // Fetch district-level donations
        const donationsRef = adminDb.collection('donations');
        const donationsSnap = await donationsRef
            .where('districtId', '==', district.id)
            .get();

        const totalTreesDonated = donationsSnap.docs.reduce((sum, doc) => {
            const data = doc.data();
            return sum + (data.treeCount || 0);
        }, 0);

        const totalTrees = totalTreesPlanted + totalTreesDonated;
        const oxygenOffset = totalTrees * 110; // 110 kg/year per tree

        const stats = {
            totalTreesPlanted,
            totalTreesDonated,
            totalTrees,
            oxygenOffset,
        };

        const response: DistrictDetail = {
            ...district,
            environmentalData: envData,
            oxygenCalculation,
            stats, // state-level contribution stats
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching district details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch district details' },
            { status: 500 }
        );
    }
}
