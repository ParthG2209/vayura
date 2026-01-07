'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { formatCompactNumber, formatNumber } from '@/lib/utils/helpers';
import { TreeContribution, Donation } from '@/lib/types';

interface ContributionStats {
    totalTreesPlanted: number;
    totalTreesDonated: number;
    totalTrees: number;
    totalO2Impact: number;
    verifiedContributions: number;
    pendingContributions: number;
    rejectedContributions: number;
}

interface ContributionData {
    contributions: (TreeContribution & { districtName: string })[];
    donations: Donation[];
    stats: ContributionStats;
}

export default function ContributionPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/?auth_required=true');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        async function fetchContributions() {
            if (!user) return;

            try {
                const response = await fetch(
                    `/api/contribution?userId=${user.uid}&userEmail=${encodeURIComponent(user.email || '')}`
                );
                if (response.ok) {
                    const contributionData = await response.json();
                    setData(contributionData);
                }
            } catch (error) {
                    console.error('Error fetching contributions:', error);
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            fetchContributions();
        }
    }, [user]);

    if (authLoading || loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </>
        );
    }

    if (!user) {
        return null;
    }

    const stats = data?.stats || {
        totalTreesPlanted: 0,
        totalTreesDonated: 0,
        totalTrees: 0,
        totalO2Impact: 0,
        verifiedContributions: 0,
        pendingContributions: 0,
        rejectedContributions: 0,
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white">
                <section className="pt-20 pb-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                                My Contributions
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Track your environmental impact and tree planting activities
                            </p>
                        </div>

                        {/* Stats Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Trees Planted</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.totalTreesPlanted}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {stats.verifiedContributions} verified
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Total Trees</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.totalTrees}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">O₂ Impact</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatCompactNumber(stats.totalO2Impact)}
                                    <span className="text-sm ml-1 text-gray-500">kg</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Lifespan total</p>
                            </div>
                        </div>

                        {/* Status Breakdown */}
                        <div className="grid grid-cols-3 gap-4 mb-12">
                            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                <p className="text-xs text-gray-500 mb-1">Verified</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    {stats.verifiedContributions}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                <p className="text-xs text-gray-500 mb-1">Pending</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    {stats.pendingContributions}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                <p className="text-xs text-gray-500 mb-1">Rejected</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    {stats.rejectedContributions}
                                </p>
                            </div>
                        </div>

                        {/* Contributions List */}
                        {data && data.contributions.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Tree Planting History
                                </h2>
                                <div className="space-y-3">
                                    {data.contributions.map((contribution) => (
                                        <div
                                            key={contribution.id}
                                            className="bg-white rounded-lg p-4 border border-gray-200"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {contribution.treeName || 'Tree'} × {contribution.treeQuantity || 1}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {contribution.districtName || 'Unknown District'}, {contribution.state || 'Unknown State'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Planted on {new Date(contribution.plantedAt).toLocaleDateString()}
                                                    </p>
                                                    {contribution.totalLifespanO2 && (
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            O₂ Impact: {formatCompactNumber(contribution.totalLifespanO2)} kg (lifespan)
                                                        </p>
                                                    )}
                                                    {contribution.o2ProductionPerYear && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {contribution.o2ProductionPerYear} kg/year per tree
                                                        </p>
                                                    )}
                                                    {contribution.estimatedLifespan && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Estimated lifespan: {contribution.estimatedLifespan} years
                                                        </p>
                                                    )}
                                                    {contribution.analysisNotes && (
                                                        <p className="text-xs text-gray-600 mt-2 italic">
                                                            {contribution.analysisNotes}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                                            contribution.status === 'VERIFIED'
                                                                ? 'bg-green-100 text-green-700'
                                                                : contribution.status === 'PENDING'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {contribution.status}
                                                    </span>
                                                    {contribution.speciesConfidence && (
                                                        <p className="text-xs text-gray-500 mt-1 text-center">
                                                            {contribution.speciesConfidence}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Donations List */}
                        {data && data.donations.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Donation History
                                </h2>
                                <div className="space-y-3">
                                    {data.donations.map((donation) => (
                                        <div
                                            key={donation.id}
                                            className="bg-white rounded-lg p-4 border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {donation.treeCount} trees via {donation.ngoReference}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Donated on {new Date(donation.donatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                {donation.amount && (
                                                    <p className="text-sm font-medium text-gray-900">
                                                        ₹{donation.amount.toLocaleString('en-IN')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {data && data.contributions.length === 0 && data.donations.length === 0 && (
                            <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
                                <p className="text-gray-600 mb-4">No contributions yet</p>
                                <a
                                    href="/plant"
                                    className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Plant Your First Tree
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

