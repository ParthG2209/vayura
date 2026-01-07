/**
 * Seed script to populate Firestore with ALL Indian districts
 * Run: npx tsx scripts/seed-districts.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import { allIndianDistricts } from './all-indian-districts';

dotenv.config();

const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
});

const db = getFirestore(app);

const sampleDistricts = allIndianDistricts;

async function seedDistricts() {
    console.log(`Starting district seed for ${sampleDistricts.length} districts...`);
    console.log('This may take a few minutes...\n');

    const districtsRef = db.collection('districts');
    
    // Firestore batch limit is 500, so we need to batch in chunks
    const batchSize = 500;
    let processedCount = 0;

    for (let i = 0; i < sampleDistricts.length; i += batchSize) {
        const chunk = sampleDistricts.slice(i, i + batchSize);
        const batch = db.batch();

        for (const district of chunk) {
            const docRef = districtsRef.doc();
            batch.set(docRef, {
                ...district,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            processedCount++;
            if (processedCount % 10 === 0) {
                console.log(`Processed ${processedCount}/${sampleDistricts.length} districts...`);
            }
        }

        await batch.commit();
        console.log(`Batch ${Math.floor(i / batchSize) + 1} committed (${chunk.length} districts)`);
    }

    console.log(`\n✓ Successfully seeded ${sampleDistricts.length} districts across all Indian states`);

    // Create STATE-based leaderboard entries (not district-based)
    console.log('\nCreating state-based leaderboard entries...');
    const leaderboardRef = db.collection('leaderboard');

    // Get unique states
    const states = [...new Set(sampleDistricts.map(d => d.state))];
    console.log(`Found ${states.length} unique states`);

    const leaderboardBatch = db.batch();
    states.forEach((state) => {
        const leaderboardDoc = leaderboardRef.doc(); // Auto-generated ID
        leaderboardBatch.set(leaderboardDoc, {
            state: state,
            totalTreesPlanted: 0,
            totalTreesDonated: 0,
            totalTrees: 0,
            oxygenOffset: 0,
            rank: 0,
            createdAt: new Date(),
            lastUpdated: new Date(),
        });
        console.log(`Created leaderboard for: ${state}`);
    });

    await leaderboardBatch.commit();
    console.log('✓ State leaderboard entries created');

    console.log('\nDone! You can now search for districts in the app.');
    process.exit(0);
}

seedDistricts().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});

