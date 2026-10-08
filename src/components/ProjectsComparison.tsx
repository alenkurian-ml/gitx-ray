import React from 'react';
import { AnalysisResult } from '../types';
import { Trophy, AlertOctagon, ArrowUpRight, Wrench } from 'lucide-react';

interface ProjectsComparisonProps {
  strongestProjects: AnalysisResult['strongestProjects'];
  weakestProjects: AnalysisResult['weakestProjects'];
  username: string;
}

export const ProjectsComparison: React.FC<ProjectsComparisonProps> = ({
  strongestProjects,
  weakestProjects,
  username,
}) => {
  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#2B2118] mb-1">
          Portfolio Anchor Analysis
        </h3>
        <p className="text-xs text-[#6B5B4E]">
          Strongest portfolio anchors versus projects dragging down profile credibility
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strongest Projects */}
        <div className="p-5 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5B8266] uppercase tracking-wider mb-4">
            <Trophy className="w-4 h-4 text-[#5B8266]" />
            <span>Strongest Projects (Highlight These)</span>
          </div>

          <div className="space-y-4">
            {strongestProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <a
                    href={`https://github.com/${username}/${proj.repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#2B2118] hover:text-[#C96442] flex items-center gap-1 font-mono transition-colors"
                  >
                    {proj.repoName}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-[#5B8266] font-semibold">
                    Top Anchor
                  </span>
                </div>
                <p className="text-xs text-[#36291E] mb-2 leading-relaxed">
                  <strong className="text-[#2B2118]">Why it stands out: </strong>
                  {proj.whyStrong}
                </p>
                <div className="text-[11px] text-[#6B5B4E] bg-[#EDEDE9] p-2 rounded border border-[#D6CCC2]/60">
                  <strong className="text-[#2B2118]">Key Highlight: </strong>
                  {proj.keyHighlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakest Projects */}
        <div className="p-5 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A34828] uppercase tracking-wider mb-4">
            <AlertOctagon className="w-4 h-4 text-[#A34828]" />
            <span>Weakest Projects (Triage or Archive)</span>
          </div>

          <div className="space-y-4">
            {weakestProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <a
                    href={`https://github.com/${username}/${proj.repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#2B2118] hover:text-[#C96442] flex items-center gap-1 font-mono transition-colors"
                  >
                    {proj.repoName}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-[#A34828] font-semibold">
                    Needs Attention
                  </span>
                </div>
                <p className="text-xs text-[#36291E] mb-2 leading-relaxed">
                  <strong className="text-[#2B2118]">Primary Flaw: </strong>
                  {proj.whyWeak}
                </p>
                <div className="text-[11px] text-[#6B5B4E] bg-[#EDEDE9] p-2 rounded border border-[#D6CCC2]/60 flex items-start gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#C96442] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#2B2118]">Action: </strong>
                    {proj.suggestedAction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
