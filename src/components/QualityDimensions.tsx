import React from 'react';
import { AnalysisResult } from '../types';
import { FileText, Cpu, CheckSquare, Clock, ShieldCheck, Layers, Radar as RadarIcon } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface QualityDimensionsProps {
  dimensions: AnalysisResult['dimensionScores'];
}

export const QualityDimensions: React.FC<QualityDimensionsProps> = ({ dimensions }) => {
  const getBadgeColor = (score: number) => {
    if (score >= 80) return { bar: '#5B8266', text: 'text-[#2e4734]' };
    if (score >= 60) return { bar: '#C96442', text: 'text-[#873a20]' };
    return { bar: '#A34828', text: 'text-[#702410]' };
  };

  const chartData = [
    {
      dimension: 'Architecture',
      fullName: 'Project Quality & Architecture',
      score: dimensions.projectQuality.score,
      fullMark: 100,
    },
    {
      dimension: 'Documentation',
      fullName: 'Documentation & Clarity',
      score: dimensions.documentationQuality.score,
      fullMark: 100,
    },
    {
      dimension: 'Engineering',
      fullName: 'Engineering Hygiene & Tooling',
      score: dimensions.engineeringQuality.score,
      fullMark: 100,
    },
    {
      dimension: 'Testing',
      fullName: 'Testing Signals & Verification',
      score: dimensions.testingSignals.score,
      fullMark: 100,
    },
    {
      dimension: 'Maintenance',
      fullName: 'Maintenance & Commit Health',
      score: dimensions.maintenanceActivity.score,
      fullMark: 100,
    },
    {
      dimension: 'Security',
      fullName: 'Security, Licenses & .gitignore',
      score: dimensions.securitySignals.score,
      fullMark: 100,
    },
  ];

  // Calculate stats
  const avgScore = Math.round(
    chartData.reduce((acc, curr) => acc + curr.score, 0) / chartData.length
  );
  const strongestDim = [...chartData].sort((a, b) => b.score - a.score)[0];
  const weakestDim = [...chartData].sort((a, b) => a.score - b.score)[0];

  const dimensionList = [
    {
      key: 'projectQuality',
      title: 'Project Quality & Architecture',
      icon: Layers,
      data: dimensions.projectQuality,
    },
    {
      key: 'documentationQuality',
      title: 'Documentation & Clarity',
      icon: FileText,
      data: dimensions.documentationQuality,
    },
    {
      key: 'engineeringQuality',
      title: 'Engineering Hygiene & Tooling',
      icon: Cpu,
      data: dimensions.engineeringQuality,
    },
    {
      key: 'testingSignals',
      title: 'Testing Signals & Verification',
      icon: CheckSquare,
      data: dimensions.testingSignals,
    },
    {
      key: 'maintenanceActivity',
      title: 'Maintenance & Commit Health',
      icon: Clock,
      data: dimensions.maintenanceActivity,
    },
    {
      key: 'securitySignals',
      title: 'Security, Licenses & .gitignore',
      icon: ShieldCheck,
      data: dimensions.securitySignals,
    },
  ];

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RadarIcon className="w-5 h-5 text-[#C96442]" />
            <h3 className="text-lg font-bold text-[#2B2118]">
              6 Core Quality Dimensions & Radar Profile
            </h3>
          </div>
          <p className="text-xs text-[#6B5B4E]">
            Forensic score breakdown evaluated strictly from public code, files, workflows, and commits
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto bg-[#EDEDE9] px-3 py-1.5 rounded-lg border border-[#D6CCC2]">
          <span className="text-[#8C7B6E]">Composite Average:</span>
          <span className="font-bold text-[#2B2118] tabular-nums text-sm">
            {avgScore}/100
          </span>
        </div>
      </div>

      {/* Radar Chart Panel & Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] mb-6">
        {/* Recharts Radar Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] w-full">
          <div className="w-full h-[290px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#D6CCC2" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: '#2B2118', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#8C7B6E', fontSize: 9 }}
                  stroke="#D6CCC2"
                />
                <Radar
                  name="Quality Score"
                  dataKey="score"
                  stroke="#C96442"
                  fill="#C96442"
                  fillOpacity={0.28}
                  dot={{ r: 4, fill: '#C96442', stroke: '#FAF5EE', strokeWidth: 1.5 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-[#FAF5EE] border border-[#D6CCC2] px-3 py-2 rounded-lg shadow-md text-xs">
                          <span className="font-bold text-[#2B2118] block mb-0.5">
                            {item.fullName}
                          </span>
                          <span className="text-[#C96442] font-mono font-semibold">
                            Score: {item.score}/100
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-[#8C7B6E] font-mono mt-1">
            Recharts Forensic Radar Profile (Scale 0 - 100)
          </span>
        </div>

        {/* Radar Insights Summary Cards */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 border-t lg:border-t-0 lg:border-l border-[#D6CCC2] pt-4 lg:pt-0 lg:pl-6">
          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
            <span className="text-[10px] font-bold text-[#5B8266] uppercase tracking-wider block mb-1">
              Strongest Dimension
            </span>
            <div className="flex items-baseline justify-between mb-0.5">
              <span className="text-xs font-bold text-[#2B2118]">
                {strongestDim.fullName}
              </span>
              <span className="text-xs font-mono font-bold text-[#5B8266] tabular-nums">
                {strongestDim.score}/100
              </span>
            </div>
            <p className="text-[11px] text-[#6B5B4E] leading-relaxed">
              Provides the highest positive signal to technical screeners and collaborators.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
            <span className="text-[10px] font-bold text-[#A34828] uppercase tracking-wider block mb-1">
              Primary Bottleneck
            </span>
            <div className="flex items-baseline justify-between mb-0.5">
              <span className="text-xs font-bold text-[#2B2118]">
                {weakestDim.fullName}
              </span>
              <span className="text-xs font-mono font-bold text-[#A34828] tabular-nums">
                {weakestDim.score}/100
              </span>
            </div>
            <p className="text-[11px] text-[#6B5B4E] leading-relaxed">
              The single biggest drag on this profile's perceived engineering maturity.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
            <span className="text-[10px] font-bold text-[#C96442] uppercase tracking-wider block mb-1">
              Radar Balance Factor
            </span>
            <div className="flex items-baseline justify-between mb-0.5">
              <span className="text-xs font-bold text-[#2B2118]">
                Variance Spread: {strongestDim.score - weakestDim.score} pts
              </span>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                {strongestDim.score - weakestDim.score > 35 ? 'Asymmetric Footprint' : 'Balanced Footprint'}
              </span>
            </div>
            <p className="text-[11px] text-[#6B5B4E] leading-relaxed">
              {strongestDim.score - weakestDim.score > 35
                ? 'High discrepancy between strong build capabilities and secondary verification rigor.'
                : 'Consistent engineering habits maintained across both code and repository operations.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Individual Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dimensionList.map((dim) => {
          const { bar, text } = getBadgeColor(dim.data.score);
          const Icon = dim.icon;

          return (
            <div
              key={dim.key}
              className="p-5 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#C96442]" />
                    <h4 className="text-xs font-semibold text-[#2B2118]">
                      {dim.title}
                    </h4>
                  </div>
                  <span className={`text-base font-bold font-mono tabular-nums ${text}`}>
                    {dim.data.score}
                    <span className="text-[11px] text-[#8C7B6E] font-normal">/100</span>
                  </span>
                </div>

                {/* Score Progress Bar */}
                <div className="w-full bg-[#D6CCC2] h-1.5 rounded-full mb-3.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, dim.data.score)}%`, backgroundColor: bar }}
                  />
                </div>

                <p className="text-xs text-[#4A3B2C] leading-relaxed">
                  {dim.data.assessment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
