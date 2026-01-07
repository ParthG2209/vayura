'use client';

import Link from 'next/link';
import { DistrictDetail } from '@/lib/types';
import { formatCompactNumber, formatNumber, getAQICategory } from '@/lib/utils/helpers';
import { validateDataSource, formatDataSource, getReliabilityColor } from '@/lib/data-sources/validation';

interface DistrictResultsProps {
  data: DistrictDetail;
}

export function DistrictResults({ data }: DistrictResultsProps) {
  const aqiInfo = getAQICategory(data.environmentalData.aqi);
  const calc = data.oxygenCalculation;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {data.name}, {data.state}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Population: {formatNumber(data.population)}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/plant"
              className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Plant a Tree
            </Link>
            <a
              href="https://tree-nation.com/plant/myself"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Donate
            </a>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 mb-1">Population</h3>
            <p className="text-xl font-semibold text-gray-900">
              {formatCompactNumber(data.population)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 mb-1">Air Quality</h3>
            <p className="text-xl font-semibold" style={{ color: aqiInfo.color }}>
              {Math.round(data.environmentalData.aqi)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{aqiInfo.label}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 mb-1">Soil Quality</h3>
            <p className="text-xl font-semibold text-gray-900">
              {Math.round(data.environmentalData.soilQuality)}<span className="text-sm text-gray-500">/100</span>
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 mb-1">Disasters</h3>
            <p className="text-xl font-semibold text-gray-900">
              {data.environmentalData.disasterFrequency.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">per year</p>
          </div>
        </div>

        {/* Trees Status */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Tree Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Trees Planted</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCompactNumber(data.stats?.totalTrees || 0)}
              </p>
              {data.stats && data.stats.totalTrees > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {formatCompactNumber(data.stats.totalTreesPlanted)} planted + {formatCompactNumber(data.stats.totalTreesDonated)} donated
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">More Needed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCompactNumber(Math.max(0, Math.round(calc.trees_required) - (data.stats?.totalTrees || 0)))}
              </p>
              <div className="text-xs text-gray-500 mt-1">
                Out of {formatCompactNumber(Math.round(calc.trees_required))} required
              </div>
            </div>
          </div>
          {data.stats && data.stats.totalTrees > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-xs font-medium text-gray-900">
                  {Math.min(100, Math.round((data.stats.totalTrees / Math.round(calc.trees_required)) * 100))}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all" 
                  style={{ width: `${Math.min(100, Math.round((data.stats.totalTrees / Math.round(calc.trees_required)) * 100))}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Oxygen Calculation Results */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">
            Oxygen Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-2">O₂ Demand</p>
              <p className="text-2xl font-semibold text-white">
                {formatCompactNumber(Math.round(calc.penalty_adjusted_demand_kg_per_year))}
                <span className="text-sm ml-1 text-gray-400">kg/yr</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-2">O₂ Deficit</p>
              <p className="text-2xl font-semibold text-white">
                {formatCompactNumber(Math.round(calc.oxygen_deficit_kg_per_year))}
                <span className="text-sm ml-1 text-gray-400">kg/yr</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-2">Trees Needed</p>
              <p className="text-3xl font-semibold text-white">
                {formatCompactNumber(Math.round(calc.trees_required))}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Formula Breakdown */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Calculation Breakdown
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <dt className="text-gray-600">Base human O₂ demand</dt>
                <dd className="font-mono font-semibold">
                  {formatNumber(Math.round(calc.formula_breakdown.human_o2_demand_kg))} kg/yr
                </dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <dt className="text-gray-600">Penalty factors</dt>
                <dd className="font-mono text-xs">
                  AQI {calc.formula_breakdown.aqi_penalty_factor.toFixed(2)}× · 
                  Soil {calc.formula_breakdown.soil_degradation_factor.toFixed(2)}× · 
                  Disaster {calc.formula_breakdown.disaster_loss_factor.toFixed(2)}×
                </dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <dt className="text-gray-600">Adjusted O₂ demand</dt>
                <dd className="font-mono font-semibold text-nature-700">
                  {formatNumber(Math.round(calc.formula_breakdown.adjusted_o2_demand_kg))} kg/yr
                </dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <dt className="text-gray-600">Per-tree O₂ supply</dt>
                <dd className="font-mono">
                  {Math.round(calc.formula_breakdown.soil_adjusted_tree_supply_kg)} kg/yr
                </dd>
              </div>
              <div className="flex justify-between py-3 bg-nature-50 -mx-6 px-6 rounded-lg mt-2">
                <dt className="font-bold text-gray-900">Trees Required</dt>
                <dd className="font-mono text-2xl font-bold text-nature-700">
                  {formatNumber(Math.round(calc.trees_required))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Assumptions & Data Sources */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Methodology & Sources
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Key Assumptions:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {calc.assumptions.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="text-xs">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Data Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {calc.data_sources.map((source, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs border border-gray-300">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-300 space-y-2">
                <p className="text-xs text-gray-500">
                  <strong>Confidence:</strong>{' '}
                  <span className="capitalize font-semibold text-gray-700">{calc.confidence_level}</span>
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">Data Sources:</p>
                  {data.environmentalData.dataSource ? (
                    validateDataSource(data.environmentalData.dataSource).map((source, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${getReliabilityColor(source.reliability)}`}>
                          {source.reliability}
                        </span>
                        <span className="text-xs text-gray-600">{source.name}</span>
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-nature-600 hover:underline"
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Multiple government sources</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

