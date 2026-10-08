import React, { useState } from 'react';
import { RescuePhase } from '../types';
import { LifeBuoy, CheckSquare, Square, Copy, Check, Download, ArrowRight, Flag } from 'lucide-react';

interface RescuePlanSectionProps {
  rescuePlan: RescuePhase[];
  username: string;
}

export const RescuePlanSection: React.FC<RescuePlanSectionProps> = ({
  rescuePlan,
  username,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const totalStepsCount = rescuePlan.reduce((acc, p) => acc + p.steps.length, 0);
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalStepsCount > 0 ? Math.round((completedCount / totalStepsCount) * 100) : 0;

  const handleCopyMarkdown = () => {
    let md = `# GitHub Rescue Plan for @${username}\n\n`;
    rescuePlan.forEach((phase) => {
      md += `## ${phase.phase} (${phase.timeframe})\n`;
      md += `**Objective**: ${phase.objective}\n\n`;
      phase.steps.forEach((step, sIdx) => {
        md += `### Step ${sIdx + 1}: ${step.title}\n`;
        md += `- **Action**: ${step.action}\n`;
        md += `- **Deliverable**: ${step.deliverable}\n\n`;
      });
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LifeBuoy className="w-5 h-5 text-[#C96442]" />
            <h3 className="text-lg font-bold text-[#2B2118]">
              Step-by-Step GitHub Rescue Plan
            </h3>
          </div>
          <p className="text-xs text-[#6B5B4E]">
            A surgical roadmap to turn weak signals into recruiter-ready engineering proof
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#5B8266]" /> : <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Plan as Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-[#2B2118]">
            Rescue Roadmap Execution
          </span>
          <span className="font-mono text-[#6B5B4E] tabular-nums">
            {completedCount} of {totalStepsCount} tasks completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-[#D6CCC2] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C96442] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {rescuePlan.map((phase, pIdx) => (
          <div
            key={pIdx}
            className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]"
          >
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-3 border-b border-[#E3D5CA]">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-[#C96442]" />
                <h4 className="text-sm font-bold text-[#2B2118]">
                  {phase.phase}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8C7B6E]">
                <span className="font-mono text-[#C96442] font-semibold">{phase.timeframe}</span>
                <span>·</span>
                <span className="italic">{phase.objective}</span>
              </div>
            </div>

            {/* Steps in this phase */}
            <div className="space-y-3">
              {phase.steps.map((step, sIdx) => {
                const stepKey = `${pIdx}-${sIdx}`;
                const isChecked = !!completedSteps[stepKey];

                return (
                  <div
                    key={sIdx}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-[#EDEDE9]/70 border-[#D6CCC2] opacity-75'
                        : 'bg-[#FAF5EE] border-[#D6CCC2] hover:border-[#C96442]/60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-[#C96442]">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#5B8266]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#8C7B6E]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold ${
                            isChecked ? 'line-through text-[#8C7B6E]' : 'text-[#2B2118]'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A3B2C] leading-relaxed mb-1.5">
                        {step.action}
                      </p>
                      <div className="text-[11px] font-mono text-[#6B5B4E] bg-[#EDEDE9] px-2 py-1 rounded inline-block">
                        <strong className="text-[#2B2118]">Target Deliverable: </strong>
                        {step.deliverable}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
