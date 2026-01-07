import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
    try {
        // Get total districts
        const districtsSnapshot = await adminDb.collection('districts').get();
        const totalDistricts = districtsSnapshot.size;

        // Get total trees and oxygen from leaderboard (state-level aggregation)
        const leaderboardSnapshot = await adminDb.collection('leaderboard').get();
        
        let totalTrees = 0;
        let totalOxygen = 0;

        leaderboardSnapshot.docs.forEach((doc) => {
            const data = doc.data();
            totalTrees += data.totalTrees || 0;
            // Use totalO2Supply if available, otherwise fallback to oxygenOffset
            totalOxygen += data.totalO2Supply || data.oxygenOffset || 0;
        });

        return NextResponse.json({
            totalDistricts,
            totalTrees,
            totalOxygen,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { totalDistricts: 0, totalTrees: 0, totalOxygen: 0 },
            { status: 500 }
        );
    }
}

