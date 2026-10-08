import React, { useState, useEffect } from 'react';
import { FactualData } from '../types';
import {
  Briefcase,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  GraduationCap,
  Award,
  Copy,
  Check,
  ArrowRight,
  Code2,
  Target,
  Clock,
  UserCheck,
} from 'lucide-react';

interface RoleTargetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  factualData: FactualData | null;
}

const COMMON_ROLES = [
  'Full-Stack Developer',
  'Backend Systems Engineer',
  'Frontend / UI Architect',
  'DevOps & Cloud Engineer',
  'AI / Machine Learning Engineer',
  'Mobile iOS/Android Engineer',
  'Security & AppSec Engineer',
];

const EXPERTISE_LEVELS = [
  'Junior / Early-Career (0-2 Yrs)',
  'Mid-Level Engineer (2-5 Yrs)',
  'Senior Engineer (5-8 Yrs)',
  'Staff / Lead Architect (8+ Yrs)',
];

const EDUCATION_LEVELS = [
  'Self-Taught / Coding Bootcamp',
  'Computer Science B.S. (B.Tech / B.E.)',
  'Computer Science M.S. (Master\'s)',
  'Ph.D. / Applied Research',
  'Non-CS STEM / Self-Directed',
];

export const RoleTargetingModal: React.FC<RoleTargetingModalProps> = ({
  isOpen,
  onClose,
  factualData,
}) => {
  const [candidateUsername, setCandidateUsername] = useState(factualData?.profile.username || 'shadcn');
  const [targetRole, setTargetRole] = useState('Backend Systems Engineer');
  const [expertiseLevel, setExpertiseLevel] = useState('Mid-Level Engineer (2-5 Yrs)');
  const [educationLevel, setEducationLevel] = useState('Computer Science B.S. (B.Tech / B.E.)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleResult, setRoleResult] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (factualData?.profile.username) {
      setCandidateUsername(factualData.profile.username);
    }
  }, [factualData]);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const effectiveUser = (candidateUsername || factualData?.profile.username || 'shadcn').trim();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/role-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: effectiveUser,
          targetRole,
          expertiseLevel,
          educationLevel,
          factualData: factualData && factualData.profile.username.toLowerCase() === effectiveUser.toLowerCase() ? factualData : undefined,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to generate role analysis.');
      }

      setRoleResult(json.result);
    } catch (err: any) {
      setError(err.message || 'Error communicating with the role analysis service.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return '#5B8266';
    if (score >= 60) return '#C96442';
    return '#A34828';
  };

  const handleCopyFullStrategy = () => {
    if (!roleResult || !factualData) return;
    let md = `# Role Target Intelligence Strategy for @${factualData.profile.username}\n\n`;
    md += `**Target Role**: ${targetRole}\n`;
    md += `**Expertise Level**: ${expertiseLevel}\n`;
    md += `**Education Background**: ${educationLevel}\n`;
    md += `**Role Readiness Score**: ${roleResult.roleMatchScore}/100\n\n`;
    md += `## Screener Readiness Assessment\n${roleResult.readinessAssessment}\n\n`;
    md += `### Strengths for ${targetRole}:\n${roleResult.strengthsForRole.map((s: string) => `- ${s}`).join('\n')}\n\n`;
    md += `### Critical Gaps for ${targetRole}:\n${roleResult.keyGapsForRole.map((g: string) => `- ${g}`).join('\n')}\n\n`;
    md += `## 3 Suggested Portfolio Repositories to Build:\n`;
    roleResult.suggestedRepositories.forEach((r: any, idx: number) => {
      md += `### ${idx + 1}. ${r.title}\n`;
      md += `- **Pitch**: ${r.pitch}\n`;
      md += `- **Stack**: ${r.recommendedStack}\n`;
      md += `- **Architecture**: ${r.architecturalDepth}\n`;
      md += `- **Impact**: ${r.portfolioImpact}\n`;
      md += `- **Timeline**: ${r.timeEstimate}\n\n`;
    });
    md += `## Step-by-Step Improvement Roadmap:\n`;
    roleResult.customImprovementSteps.forEach((s: any, idx: number) => {
      md += `### Step ${idx + 1}: ${s.title} [${s.priority}]\n`;
      md += `- **Action**: ${s.action}\n`;
      md += `- **Why It Matters**: ${s.whyItMattersForRole}\n\n`;
    });

    handleCopy('full-strategy', md);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF5EE] border border-[#D6CCC2] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E3D5CA] bg-[#EDEDE9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C96442] flex items-center justify-center text-[#FFFBF7] shadow-xs shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#2B2118]">
                  Role-Targeted AI Architect & Repository Suggestions
                </h3>
              </div>
              <p className="text-xs text-[#6B5B4E]">
                Tailor @{factualData?.profile.username || 'user'}'s profile for a specific engineering role, seniority, and education level.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#8C7B6E] hover:text-[#2B2118] rounded-md hover:bg-[#D6CCC2]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Target Role Specification Form */}
          <form onSubmit={handleGenerate} className="p-5 bg-[#EDEDE9] rounded-2xl border border-[#D6CCC2] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2B2118] uppercase tracking-wider">
                Specify Career Target & Candidate Parameters
              </span>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Evaluates real GitHub code against industry role rubrics
              </span>
            </div>

            {/* Candidate User Field */}
            <div>
              <label className="text-xs font-bold text-[#2B2118] block mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C96442]" />
                  Candidate GitHub Profile
                </span>
                <span className="text-[11px] font-normal text-[#8C7B6E]">
                  {factualData ? 'Currently inspected profile' : 'Pick notable profile or enter any username'}
                </span>
              </label>
              <input
                type="text"
                value={candidateUsername}
                onChange={(e) => setCandidateUsername(e.target.value)}
                placeholder="e.g. shadcn, torvalds, octocat..."
                className="w-full px-3.5 py-2 bg-[#FAF5EE] border border-[#D6CCC2] rounded-xl text-xs font-semibold text-[#2B2118] focus:outline-none focus:border-[#C96442]"
                required
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['shadcn', 'torvalds', 'gaearon', 'sindresorhus', 'octocat'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setCandidateUsername(u)}
                    className={`px-2 py-0.5 text-[11px] rounded-md transition-colors cursor-pointer ${
                      candidateUsername === u
                        ? 'bg-[#C96442] text-[#FFFBF7] font-semibold'
                        : 'bg-[#FAF5EE] text-[#6B5B4E] border border-[#D6CCC2] hover:text-[#2B2118]'
                    }`}
                  >
                    @{u}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Input & Quick Picks */}
            <div>
              <label className="text-xs font-bold text-[#2B2118] block mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#C96442]" />
                Target Career Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Backend Systems Engineer"
                className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D6CCC2] rounded-xl text-xs font-semibold text-[#2B2118] focus:outline-none focus:border-[#C96442] focus:ring-1 focus:ring-[#C96442]"
                required
              />

              {/* Quick Picks for roles */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {COMMON_ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRole(r)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg transition-colors cursor-pointer ${
                      targetRole === r
                        ? 'bg-[#C96442] text-[#FFFBF7] font-semibold'
                        : 'bg-[#FAF5EE] text-[#6B5B4E] border border-[#D6CCC2] hover:text-[#2B2118]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Expertise & Education Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#2B2118] block mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#C96442]" />
                  Target Expertise Level
                </label>
                <select
                  value={expertiseLevel}
                  onChange={(e) => setExpertiseLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#D6CCC2] rounded-xl text-xs font-medium text-[#2B2118] focus:outline-none focus:border-[#C96442]"
                >
                  {EXPERTISE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B2118] block mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C96442]" />
                  Educational Background
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#D6CCC2] rounded-xl text-xs font-medium text-[#2B2118] focus:outline-none focus:border-[#C96442]"
                >
                  {EDUCATION_LEVELS.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !targetRole.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#C96442] hover:bg-[#B45535] active:bg-[#A34828] text-[#FFFBF7] font-semibold text-xs rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Codebase for Role...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Role Match & Custom Projects</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-[#FBEBE8] border border-[#F0BCB4] rounded-xl text-xs text-[#8C2C18]">
              {error}
            </div>
          )}

          {/* Role Analysis Results */}
          {roleResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score & Verdict Card */}
              <div className="p-5 sm:p-6 bg-[#EDEDE9] rounded-2xl border border-[#D6CCC2]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#D6CCC2]">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#C96442] uppercase tracking-wider block mb-1">
                      Target Role Evaluation
                    </span>
                    <h4 className="text-lg font-bold text-[#2B2118]">
                      {targetRole} ({expertiseLevel})
                    </h4>
                    <span className="text-xs text-[#6B5B4E]">
                      Education Calibration: {educationLevel}
                    </span>
                  </div>

                  {/* Role Match Score */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C7B6E] uppercase font-bold block">
                        Role Fit Score
                      </span>
                      <span className="text-2xl font-bold font-mono text-[#2B2118] tabular-nums">
                        {roleResult.roleMatchScore}
                        <span className="text-xs text-[#8C7B6E]">/100</span>
                      </span>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-mono text-xs font-bold"
                      style={{
                        borderColor: getScoreColor(roleResult.roleMatchScore),
                        color: getScoreColor(roleResult.roleMatchScore),
                        backgroundColor: '#FAF5EE',
                      }}
                    >
                      {roleResult.roleMatchScore}%
                    </div>
                  </div>
                </div>

                {/* Readiness Assessment Prose */}
                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2] mb-4">
                  <span className="text-[10px] font-bold text-[#8C7B6E] uppercase tracking-wider block mb-1">
                    Senior Screener Assessment for this Role
                  </span>
                  <p className="text-xs text-[#36291E] leading-relaxed">
                    {roleResult.readinessAssessment}
                  </p>
                </div>

                {/* Strengths vs Gaps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B8266] uppercase tracking-wider mb-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5B8266]" />
                      <span>Current Profile Strengths for this Role</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#36291E]">
                      {roleResult.strengthsForRole.map((str: string, sIdx: number) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="text-[#5B8266] font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#A34828] uppercase tracking-wider mb-2.5">
                      <AlertTriangle className="w-4 h-4 text-[#A34828]" />
                      <span>Missing Critical Signals / Gaps for this Role</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#36291E]">
                      {roleResult.keyGapsForRole.map((gap: string, gIdx: number) => (
                        <li key={gIdx} className="flex items-start gap-2">
                          <span className="text-[#A34828] font-bold">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3 Tailored Suggested Repositories */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#2B2118]">
                      3 Custom Portfolio Projects to Build for {targetRole}
                    </h4>
                    <p className="text-xs text-[#6B5B4E]">
                      Building these exact projects will plug your critical gaps and convince technical hiring committees.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyFullStrategy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'full-strategy' ? <Check className="w-3.5 h-3.5 text-[#5B8266]" /> : <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />}
                    <span>{copiedKey === 'full-strategy' ? 'Copied Strategy' : 'Copy Strategy Markdown'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {roleResult.suggestedRepositories.map((repo: any, rIdx: number) => (
                    <div
                      key={rIdx}
                      className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2] shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-mono font-bold text-[#C96442] bg-[#EDEDE9] px-2 py-0.5 rounded border border-[#D6CCC2]">
                              Blueprint 0{rIdx + 1}
                            </span>
                            <h5 className="text-sm font-bold text-[#2B2118]">
                              {repo.title}
                            </h5>
                          </div>
                          <p className="text-xs font-medium text-[#4A3B2C] italic">
                            "{repo.pitch}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#8C7B6E] bg-[#EDEDE9] px-2 py-1 rounded">
                            <Clock className="w-3 h-3 text-[#C96442]" />
                            {repo.timeEstimate}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-[#E3D5CA] text-xs">
                        <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]/70">
                          <span className="text-[10px] font-bold text-[#8C7B6E] uppercase block mb-1">
                            Recommended Stack
                          </span>
                          <p className="text-[#2B2118] font-mono font-semibold text-[11px]">
                            {repo.recommendedStack}
                          </p>
                        </div>

                        <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]/70">
                          <span className="text-[10px] font-bold text-[#8C7B6E] uppercase block mb-1">
                            Architectural Concepts to Show
                          </span>
                          <p className="text-[#36291E] leading-relaxed">
                            {repo.architecturalDepth}
                          </p>
                        </div>

                        <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]/70">
                          <span className="text-[10px] font-bold text-[#C96442] uppercase block mb-1">
                            Hiring Committee Impact
                          </span>
                          <p className="text-[#36291E] leading-relaxed">
                            {repo.portfolioImpact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Improvement Roadmap */}
              <div className="p-5 bg-[#EDEDE9] rounded-2xl border border-[#D6CCC2]">
                <h4 className="text-sm font-bold text-[#2B2118] mb-1">
                  Custom Step-by-Step Profile Improvement Roadmap
                </h4>
                <p className="text-xs text-[#6B5B4E] mb-4">
                  Prioritized sequence tailored specifically to your {expertiseLevel} target and {educationLevel} background:
                </p>

                <div className="space-y-3">
                  {roleResult.customImprovementSteps.map((step: any, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#C96442] text-[#FFFBF7] text-[11px] font-bold flex items-center justify-center font-mono">
                            {sIdx + 1}
                          </span>
                          <h5 className="text-xs font-bold text-[#2B2118]">
                            {step.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C96442] bg-[#EDEDE9] px-2 py-0.5 rounded border border-[#D6CCC2]">
                          Priority: {step.priority}
                        </span>
                      </div>

                      <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2 pl-7">
                        {step.action}
                      </p>

                      <div className="text-[11px] text-[#6B5B4E] pl-7 italic">
                        <strong>Why it matters for {targetRole}: </strong>
                        {step.whyItMattersForRole}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EDEDE9] border-t border-[#E3D5CA] flex items-center justify-between text-xs text-[#6B5B4E]">
          <span>Role Matching Intelligence Engine</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF5EE] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
