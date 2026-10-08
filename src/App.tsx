import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { ProfileBanner } from './components/ProfileBanner';
import { RecruiterSection } from './components/RecruiterSection';
import { QualityDimensions } from './components/QualityDimensions';
import { ProblemsSection } from './components/ProblemsSection';
import { ProjectsComparison } from './components/ProjectsComparison';
import { RepoInspectionGrid } from './components/RepoInspectionGrid';
import { RescuePlanSection } from './components/RescuePlanSection';
import { AiWalkthroughSection } from './components/AiWalkthroughSection';
import { NewGitHubUserGuide } from './components/NewGitHubUserGuide';
import { RawEvidenceModal } from './components/RawEvidenceModal';
import { WhyAiShowcaseModal } from './components/WhyAiShowcaseModal';
import { RoleTargetingModal } from './components/RoleTargetingModal';
import { XRayResponse } from './types';
import {
  Sparkles,
  Layers,
  AlertTriangle,
  FileCode,
  LifeBuoy,
  Briefcase,
  Share2,
  Check,
  RotateCcw,
  Search,
  Bot,
  Compass,
  ArrowRight,
  Target,
} from 'lucide-react';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);
  const [data, setData] = useState<XRayResponse | null>(null);
  const [activeTab, setActiveTab] = useState<
    'all' | 'ai_walkthrough' | 'recruiter' | 'dimensions' | 'problems' | 'repos' | 'rescue' | 'guide'
  >('all');
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState<boolean>(false);
  const [isAiShowcaseOpen, setIsAiShowcaseOpen] = useState<boolean>(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [reportCopied, setReportCopied] = useState<boolean>(false);
  const [showStarterGuideInEmpty, setShowStarterGuideInEmpty] = useState<boolean>(false);

  // Check URL param on mount (e.g. ?user=torvalds)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    if (userParam) {
      handleSearch(userParam);
    }
  }, []);

  const handleSearch = async (userToScan: string, token?: string, forceSnapshot?: boolean) => {
    if (!userToScan || isLoading) return;

    setIsLoading(true);
    setError(null);
    setRateLimitReset(null);
    setUsername(userToScan);

    // Update URL query quietly
    const newUrl = `${window.location.pathname}?user=${encodeURIComponent(userToScan)}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['x-github-token'] = token;
      }

      const response = await fetch('/api/xray', {
        method: 'POST',
        headers,
        body: JSON.stringify({ username: userToScan, token, forceSnapshot }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError(json.error || 'GitHub public rate limit reached.');
          setRateLimitReset(json.resetAt || null);
        } else {
          setError(json.error || 'Failed to scan GitHub profile.');
        }
        setData(null);
      } else {
        setData(json);
        if (activeTab === 'guide') {
          setActiveTab('all');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network error connecting to GitHub X-Ray service.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
    setUsername('');
    setActiveTab('all');
    setShowStarterGuideInEmpty(false);
    const cleanUrl = window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  };

  const handleOpenGuide = () => {
    if (data) {
      setActiveTab('guide');
    } else {
      setShowStarterGuideInEmpty(true);
    }
  };

  const handleCopyFullReport = () => {
    if (!data) return;
    const { factualData, analysis } = data;
    const profile = factualData.profile;

    let report = `# GitHub X-Ray Intelligence Report: @${profile.username}\n\n`;
    report += `**Name**: ${profile.name} | **Account Age**: ${profile.accountAgeYears} years | **Public Repos**: ${profile.public_repos_count}\n`;
    report += `**Health Score**: ${analysis.overallSummary.profileHealthScore}/100 | **Perceived Seniority**: ${analysis.overallSummary.perceivedSeniority}\n\n`;
    report += `## Executive Verdict\n${analysis.overallSummary.headline}\n\n${analysis.overallSummary.narrative}\n\n`;
    report += `## 10-Second Recruiter Impression\n"${analysis.recruiterImpression.tenSecondTakeaway}"\n\n`;
    report += `### Green Flags:\n${analysis.recruiterImpression.greenFlags.map((g) => `- ${g}`).join('\n')}\n\n`;
    report += `### Red Flags:\n${analysis.recruiterImpression.redFlags.map((r) => `- ${r}`).join('\n')}\n\n`;
    report += `## Top Problems & Forensic Fixes:\n`;
    analysis.biggestProblems.forEach((p, idx) => {
      report += `### ${idx + 1}. ${p.problem} [${p.severity.toUpperCase()}]\n`;
      report += `- **Evidence**: ${p.evidence}\n`;
      report += `- **Why it matters**: ${p.whyItMatters}\n`;
      report += `- **How to fix**: ${p.howToFix}\n\n`;
    });

    navigator.clipboard.writeText(report);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5EBE0] text-[#2B2118] flex flex-col font-sans selection:bg-[#E3D5CA] selection:text-[#2B2118]">
      {/* Top Navigation */}
      <Header
        onReset={handleReset}
        onOpenGuide={handleOpenGuide}
        onOpenAiShowcase={() => setIsAiShowcaseOpen(true)}
        onOpenRoleTargeting={() => setIsRoleModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Search Bar / Input Area */}
        <SearchSection
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
          rateLimitReset={rateLimitReset}
          currentUsername={username}
          onOpenAiShowcase={() => setIsAiShowcaseOpen(true)}
          onOpenRoleTargeting={() => setIsRoleModalOpen(true)}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Results State */}
          {data && !isLoading && (
            <div>
              {/* Navigation Bar / Quick View Tabs & Share Report */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1.5 p-1 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] overflow-x-auto max-w-full">
                  {[
                    { id: 'all', label: 'Complete X-Ray', icon: Sparkles },
                    { id: 'ai_walkthrough', label: 'AI Analysis', icon: Bot, highlight: true },
                    { id: 'recruiter', label: 'Recruiter View', icon: Briefcase },
                    { id: 'dimensions', label: '6 Dimensions', icon: Layers },
                    { id: 'problems', label: 'Problems & Fixes', icon: AlertTriangle },
                    { id: 'repos', label: 'Repositories', icon: FileCode },
                    { id: 'rescue', label: 'Rescue Plan', icon: LifeBuoy },
                    { id: 'guide', label: 'New GitHub User', icon: Compass },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isTabActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isTabActive
                            ? 'bg-[#FAF5EE] text-[#C96442] shadow-xs'
                            : tab.highlight
                            ? 'text-[#C96442] hover:text-[#B45535] font-bold'
                            : 'text-[#6B5B4E] hover:text-[#2B2118]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${tab.highlight && !isTabActive ? 'text-[#C96442]' : ''}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsRoleModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF5EE] hover:bg-[#EDEDE9] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <Target className="w-3.5 h-3.5 text-[#C96442]" />
                    <span>Target a Role</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAiShowcaseOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF5EE] hover:bg-[#EDEDE9] border border-[#D6CCC2] text-xs font-semibold text-[#C96442] rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why API is Over</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFullReport}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF5EE] hover:bg-[#EDEDE9] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    {reportCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#5B8266]" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#8C7B6E]" />
                        <span>Copy Report</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSearch(username)}
                    title="Re-run fresh scan"
                    className="p-2 bg-[#FAF5EE] hover:bg-[#EDEDE9] border border-[#D6CCC2] text-[#6B5B4E] hover:text-[#2B2118] rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Overview Banner (always visible on top) */}
              <ProfileBanner
                profile={data.factualData.profile}
                stats={data.factualData.stats}
                analysis={data.analysis}
                sourceMode={data.sourceMode}
                rateLimitNotice={data.rateLimitNotice}
                onOpenEvidence={() => setIsEvidenceModalOpen(true)}
                onOpenAiAnalysis={() => setActiveTab('ai_walkthrough')}
                onOpenRoleTargeting={() => setIsRoleModalOpen(true)}
              />

              {/* Active Tab Content */}
              {activeTab === 'ai_walkthrough' && (
                <AiWalkthroughSection
                  factualData={data.factualData}
                  analysis={data.analysis}
                />
              )}

              {activeTab === 'guide' && <NewGitHubUserGuide />}

              {(activeTab === 'all' || activeTab === 'recruiter') && (
                <RecruiterSection recruiterData={data.analysis.recruiterImpression} />
              )}

              {(activeTab === 'all' || activeTab === 'dimensions') && (
                <QualityDimensions dimensions={data.analysis.dimensionScores} />
              )}

              {(activeTab === 'all' || activeTab === 'problems') && (
                <>
                  <ProblemsSection
                    problems={data.analysis.biggestProblems}
                    priorityImprovements={data.analysis.priorityImprovements}
                  />
                  <ProjectsComparison
                    strongestProjects={data.analysis.strongestProjects}
                    weakestProjects={data.analysis.weakestProjects}
                    username={data.factualData.profile.username}
                  />
                </>
              )}

              {(activeTab === 'all' || activeTab === 'repos') && (
                <RepoInspectionGrid
                  deepRepos={data.factualData.deepInspectedRepos}
                  analyses={data.analysis.repositoryAnalyses}
                />
              )}

              {(activeTab === 'all' || activeTab === 'rescue') && (
                <RescuePlanSection
                  rescuePlan={data.analysis.rescuePlan}
                  username={data.factualData.profile.username}
                />
              )}

              {/* In 'all' view, also present the AI Walkthrough at the conclusion */}
              {activeTab === 'all' && (
                <AiWalkthroughSection
                  factualData={data.factualData}
                  analysis={data.analysis}
                />
              )}
            </div>
          )}

          {/* Empty / Intro Guide State */}
          {!data && !isLoading && !error && (
            <div className="py-8 max-w-4xl mx-auto space-y-8">
              {/* Toggle Banner between X-Ray Intro & New GitHub User Guide & AI Showcase & Role Target */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowStarterGuideInEmpty(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    !showStarterGuideInEmpty
                      ? 'bg-[#FAF5EE] text-[#C96442] border border-[#D6CCC2] shadow-xs'
                      : 'text-[#6B5B4E] hover:text-[#2B2118]'
                  }`}
                >
                  Forensic Diagnostics Overview
                </button>
                <button
                  type="button"
                  onClick={() => setShowStarterGuideInEmpty(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    showStarterGuideInEmpty
                      ? 'bg-[#FAF5EE] text-[#C96442] border border-[#D6CCC2] shadow-xs'
                      : 'text-[#6B5B4E] hover:text-[#2B2118]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#C96442]" />
                  <span>New GitHub User Guide (First Login)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAiShowcaseOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FAF5EE] hover:bg-[#EDEDE9] border border-[#D6CCC2] text-xs font-semibold text-[#C96442] rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Showcase AI: Why API is Over</span>
                </button>
              </div>

              {showStarterGuideInEmpty ? (
                <NewGitHubUserGuide />
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2B2118] mb-2">
                      What GitHub X-Ray Inspects
                    </h2>
                    <p className="text-sm text-[#6B5B4E] max-w-xl mx-auto">
                      A high-fidelity forensic assessment of real code, structure, and engineering credibility.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                      <div className="w-8 h-8 rounded-lg bg-[#EDEDE9] flex items-center justify-center text-[#C96442] mb-3">
                        <Search className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#2B2118] mb-1">
                        1. Real Public GitHub Data
                      </h3>
                      <p className="text-xs text-[#6B5B4E] leading-relaxed">
                        Directly queries GitHub's REST API for repos, commit cadence, languages, test files, workflows, licenses, and README byte-size.
                      </p>
                    </div>

                    <div className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                      <div className="w-8 h-8 rounded-lg bg-[#EDEDE9] flex items-center justify-center text-[#C96442] mb-3">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#2B2118] mb-1">
                        2. Recruiter & Senior Audit
                      </h3>
                      <p className="text-xs text-[#6B5B4E] leading-relaxed">
                        Reveals the real 10-second hiring screener impression, green flags, deal-breakers, and 6 core engineering quality dimensions.
                      </p>
                    </div>

                    <div className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                      <div className="w-8 h-8 rounded-lg bg-[#EDEDE9] flex items-center justify-center text-[#C96442] mb-3">
                        <Bot className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#2B2118] mb-1">
                        3. AI Step-by-Step Enhancement
                      </h3>
                      <p className="text-xs text-[#6B5B4E] leading-relaxed">
                        Advanced AI models review the factual footprint to provide custom README templates, CI/CD workflow files, and testing setups.
                      </p>
                    </div>
                  </div>

                  {/* Starter Guide Callout card in empty view */}
                  <div className="p-5 bg-[#EDEDE9] rounded-2xl border border-[#D6CCC2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-[#C96442] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-[#2B2118]">
                          Just Created Your GitHub Account?
                        </h4>
                        <p className="text-xs text-[#6B5B4E]">
                          Explore our New GitHub User Guide covering the special Profile README secret, essential Git commands, and repository golden rules.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowStarterGuideInEmpty(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#FAF5EE] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      <span>Open Starter Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C96442]" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Raw Verified Evidence Drawer/Modal */}
      {data && (
        <RawEvidenceModal
          isOpen={isEvidenceModalOpen}
          onClose={() => setIsEvidenceModalOpen(false)}
          factualData={data.factualData}
        />
      )}

      {/* Why AI Showcase Modal */}
      <WhyAiShowcaseModal
        isOpen={isAiShowcaseOpen}
        onClose={() => setIsAiShowcaseOpen(false)}
        onTriggerLiveScan={(u) => handleSearch(u, undefined, true)}
      />

      {/* Role-Targeted AI Architect Modal */}
      <RoleTargetingModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        factualData={data?.factualData || null}
      />

      {/* Clean watermark-free footer */}
      <footer className="border-t border-[#E3D5CA] bg-[#FAF5EE] py-6 mt-12 text-center text-xs text-[#8C7B6E]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>GitHub X-Ray — Developer Profile & Repository Forensic Intelligence</span>
          <span>© {new Date().getFullYear()} GitHub X-Ray. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
