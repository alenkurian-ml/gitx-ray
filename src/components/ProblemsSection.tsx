import React, { useState } from 'react';
import { ProblemItem, AnalysisResult } from '../types';
import { AlertTriangle, AlertCircle, Sparkles, CheckCircle2, ArrowRight, Zap, Target, Wrench } from 'lucide-react';

interface ProblemsSectionProps {
  problems: ProblemItem[];
  priorityImprovements: AnalysisResult['priorityImprovements'];
}

export const ProblemsSection: React.FC<ProblemsSectionProps> = ({
  problems,
  priorityImprovements,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'opportunity'>('all');

  const filteredProblems = problems.filter((p) => {
    if (filter === 'all') return true;
    return p.severity.toLowerCase() === filter;
  });

  const getSeverityStyle = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes('crit')) {
      return {
        tagBg: 'bg-[#FBEBE8]',
        border: 'border-[#E8A598]',
        tagText: 'text-[#8C2C18]',
        label: 'Critical Issue',
        icon: AlertCircle,
      };
    }
    if (s.includes('warn')) {
      return {
        tagBg: 'bg-[#FBF4E8]',
        border: 'border-[#E8CCA5]',
        tagText: 'text-[#8C5D18]',
        label: 'Warning Signal',
        icon: AlertTriangle,
      };
    }
    return {
      tagBg: 'bg-[#EBF5EE]',
      border: 'border-[#B4DFC1]',
      tagText: 'text-[#266336]',
      label: 'Growth Opportunity',
      icon: Sparkles,
    };
  };

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#2B2118] mb-1">
            Top Problems & Forensic Root Causes
          </h3>
          <p className="text-xs text-[#6B5B4E]">
            Verified gaps structured explicitly as Problem → Evidence → Why it matters → How to fix it
          </p>
        </div>

        {/* Filter segmented buttons (functional interactive controls) */}
        <div className="flex items-center gap-1 p-1 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2] self-start sm:self-auto">
          {(['all', 'critical', 'warning', 'opportunity'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                filter === tab
                  ? 'bg-[#FAF5EE] text-[#2B2118] shadow-xs'
                  : 'text-[#6B5B4E] hover:text-[#2B2118]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4 mb-8">
        {filteredProblems.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6B5B4E] bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            No issues found in this severity category.
          </div>
        ) : (
          filteredProblems.map((prob, idx) => {
            const style = getSeverityStyle(prob.severity);
            const Icon = style.icon;

            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border ${style.border} ${style.tagBg} transition-all`}
              >
                {/* Problem Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2.5">
                    <Icon className={`w-4 h-4 ${style.tagText} shrink-0 mt-0.5`} />
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${style.tagText} block`}>
                        {style.label}
                      </span>
                      <h4 className="text-sm font-bold text-[#2B2118]">
                        {prob.problem}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Evidence → Why it matters → How to fix it */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  {/* Evidence */}
                  <div className="p-3 bg-[#FAF5EE]/90 rounded-lg border border-[#D6CCC2]/70">
                    <span className="font-semibold text-[#8C7B6E] block mb-1 uppercase text-[10px] tracking-wider">
                      1. Evidence (From GitHub)
                    </span>
                    <p className="text-[#36291E] font-mono leading-relaxed text-[11px]">
                      {prob.evidence}
                    </p>
                  </div>

                  {/* Why it matters */}
                  <div className="p-3 bg-[#FAF5EE]/90 rounded-lg border border-[#D6CCC2]/70">
                    <span className="font-semibold text-[#8C7B6E] block mb-1 uppercase text-[10px] tracking-wider">
                      2. Why It Matters
                    </span>
                    <p className="text-[#36291E] leading-relaxed">
                      {prob.whyItMatters}
                    </p>
                  </div>

                  {/* How to fix it */}
                  <div className="p-3 bg-[#FAF5EE]/90 rounded-lg border border-[#C96442]/30">
                    <span className="font-semibold text-[#C96442] block mb-1 uppercase text-[10px] tracking-wider">
                      3. How To Fix It
                    </span>
                    <p className="text-[#2B2118] font-medium leading-relaxed">
                      {prob.howToFix}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Priority Improvements Matrix (Quick wins, high impact, structural) */}
      <div className="pt-6 border-t border-[#E3D5CA]">
        <h4 className="text-sm font-bold text-[#2B2118] mb-4">
          Priority Improvement Matrix
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Wins */}
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C96442] mb-3">
              <Zap className="w-4 h-4" />
              <span>Quick Wins (&lt; 15 Mins)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#36291E]">
              {priorityImprovements.quickWins.map((win, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#C96442] font-bold mt-0.5">•</span>
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High Impact */}
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2B2118] mb-3">
              <Target className="w-4 h-4 text-[#C96442]" />
              <span>High-Impact Fixes (1-2 Hours)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#36291E]">
              {priorityImprovements.highImpact.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#C96442] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structural Upgrades */}
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B5B4E] mb-3">
              <Wrench className="w-4 h-4 text-[#8C7B6E]" />
              <span>Structural Upgrades (Weekend)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#36291E]">
              {priorityImprovements.structuralUpgrades.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#8C7B6E] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
