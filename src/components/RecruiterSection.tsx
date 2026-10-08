import React from 'react';
import { AnalysisResult } from '../types';
import { Briefcase, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface RecruiterSectionProps {
  recruiterData: AnalysisResult['recruiterImpression'];
}

export const RecruiterSection: React.FC<RecruiterSectionProps> = ({ recruiterData }) => {
  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <Briefcase className="w-5 h-5 text-[#C96442]" />
        <div>
          <h3 className="text-lg font-bold text-[#2B2118]">
            Recruiter & Hiring Manager Lens
          </h3>
          <p className="text-xs text-[#6B5B4E]">
            How this GitHub footprint is judged in the initial 10-second technical screen
          </p>
        </div>
      </div>

      {/* 10-Second Takeaway Banner */}
      <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] mb-6">
        <div className="text-xs font-semibold text-[#8C7B6E] uppercase tracking-wider mb-1">
          The 10-Second Takeaway
        </div>
        <p className="text-sm font-medium text-[#2B2118] leading-relaxed">
          "{recruiterData.tenSecondTakeaway}"
        </p>
      </div>

      {/* Green Flags vs Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5B8266] uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#5B8266]" />
            <span>Green Flags (Hiring Strengths)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#36291E]">
            {recruiterData.greenFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#5B8266] font-bold mt-0.5">•</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A34828] uppercase tracking-wider mb-3">
            <XCircle className="w-4 h-4 text-[#A34828]" />
            <span>Red Flags (Screener Friction Points)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#36291E]">
            {recruiterData.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#A34828] font-bold mt-0.5">•</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pass / Fail Reasoning */}
      <div className="pt-4 border-t border-[#E3D5CA]">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#C96442] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-[#2B2118] block mb-1">
              Final Screener Decision Calculus:
            </span>
            <p className="text-xs text-[#4A3B2C] leading-relaxed">
              {recruiterData.passOrFailReasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
