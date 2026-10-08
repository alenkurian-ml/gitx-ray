import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, Sparkles, ExternalLink, RefreshCw, Key, Shield, Zap } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (username: string, token?: string, forceSnapshot?: boolean) => void;
  isLoading: boolean;
  error: string | null;
  rateLimitReset: number | null;
  currentUsername?: string;
  onOpenAiShowcase?: () => void;
  onOpenRoleTargeting?: () => void;
}

const SAMPLE_PROFILES = [
  { username: 'shadcn', label: 'shadcn', desc: 'UI & Design Systems' },
  { username: 'torvalds', label: 'torvalds', desc: 'Linux & Git Creator' },
  { username: 'gaearon', label: 'gaearon', desc: 'React Core & Ecosystem' },
  { username: 'sindresorhus', label: 'sindresorhus', desc: 'High-Volume Packages' },
  { username: 'octocat', label: 'octocat', desc: 'Official GitHub Mascot' },
];

const SCAN_STEPS = [
  'Querying GitHub public profile gateway & records...',
  'Extracting user profile, followers & repository registry...',
  'Inspecting root file trees, .gitignore, licenses & workflows...',
  'Detecting automated test suites & dependency structures...',
  'Synthesizing deep forensic intelligence with AI Engine...',
  'Compiling recruiter impression, dimension scores and rescue plan...',
];

export const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  isLoading,
  error,
  rateLimitReset,
  currentUsername,
  onOpenAiShowcase,
  onOpenRoleTargeting,
}) => {
  const [inputVal, setInputVal] = useState(currentUsername || '');
  const [customToken, setCustomToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    if (currentUsername) {
      setInputVal(currentUsername);
    }
  }, [currentUsername]);

  // Rotate through scan steps while loading
  useEffect(() => {
    if (!isLoading) {
      setCurrentStepIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
    }, 2400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputVal
      .trim()
      .replace(/^https?:\/\/github\.com\//, '')
      .replace(/^@/, '')
      .split('/')[0];
    if (cleaned) {
      onSearch(cleaned, customToken || undefined);
    }
  };

  const handleInstantShowcase = (targetUser = 'shadcn') => {
    setInputVal(targetUser);
    onSearch(targetUser, customToken || undefined, true);
  };

  return (
    <section className="py-8 sm:py-12 border-b border-[#E3D5CA] bg-gradient-to-b from-[#FAF5EE] to-[#F5EBE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Showcase Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEDE9] border border-[#D6CCC2] text-xs text-[#2B2118] font-medium mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C96442]" />
          <span>Real Public GitHub Data · Forensic AI Evaluation · Zero Fluff</span>
          {onOpenAiShowcase && (
            <button
              type="button"
              onClick={onOpenAiShowcase}
              className="text-[#C96442] hover:underline font-semibold ml-1 cursor-pointer"
            >
              Why API is Over →
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B2118] mb-3 text-balance">
          Uncompromising GitHub Diagnostics
        </h1>
        <p className="text-base sm:text-lg text-[#6B5B4E] max-w-2xl mx-auto mb-6 text-balance">
          Inspect real public repository signals, testing hygiene, documentation depth, and recruiter impressions. Backed by factual evidence and deep AI reasoning.
        </p>

        {/* Quick Showcase Trigger Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleInstantShowcase('shadcn')}
            className="flex items-center gap-2 px-4 py-2 bg-[#C96442] hover:bg-[#B45535] active:bg-[#A34828] text-[#FFFBF7] text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Instant AI Audit on @shadcn</span>
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleInstantShowcase('torvalds')}
            className="flex items-center gap-2 px-4 py-2 bg-[#FAF5EE] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-[#2B2118] text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <span>Audit @torvalds</span>
          </button>
          {onOpenAiShowcase && (
            <button
              type="button"
              onClick={onOpenAiShowcase}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-[#4A3B2C] text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C96442]" />
              <span>Why GitHub API is Over</span>
            </button>
          )}
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-4">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2] shadow-sm focus-within:border-[#C96442] focus-within:ring-2 focus-within:ring-[#C96442]/20 transition-all">
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-[#8C7B6E] shrink-0 mr-2" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter GitHub username (e.g. torvalds or shadcn)..."
                disabled={isLoading}
                className="w-full bg-transparent border-0 text-[#2B2118] placeholder-[#8C7B6E] text-base focus:outline-none focus:ring-0"
              />
              {inputVal && !isLoading && (
                <button
                  type="button"
                  onClick={() => setInputVal('')}
                  className="text-xs text-[#8C7B6E] hover:text-[#2B2118] px-2 py-1 mr-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C96442] hover:bg-[#B45535] active:bg-[#A34828] text-[#FFFBF7] font-semibold text-sm rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run X-Ray Scan</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Optional GitHub Token Toggle */}
        <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-[#6B5B4E] px-2 mb-5">
          <button
            type="button"
            onClick={() => setShowTokenInput(!showTokenInput)}
            className="flex items-center gap-1.5 text-[#8C7B6E] hover:text-[#2B2118] font-medium cursor-pointer transition-colors"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{showTokenInput ? 'Hide token field' : 'Optional: Have a GitHub Token? (5,000 req/hr)'}</span>
          </button>

          {onOpenRoleTargeting && (
            <button
              type="button"
              onClick={onOpenRoleTargeting}
              className="text-[#C96442] hover:underline font-semibold cursor-pointer"
            >
              Target a Specific Role →
            </button>
          )}
        </div>

        {/* Expanded GitHub Token Input */}
        {showTokenInput && (
          <div className="max-w-2xl mx-auto p-3 mb-6 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2] text-left text-xs animate-in fade-in duration-200">
            <label className="block text-xs font-bold text-[#2B2118] mb-1">
              Personal GitHub Access Token (Optional)
            </label>
            <p className="text-[11px] text-[#6B5B4E] mb-2">
              GitHub allows 5,000 requests/hr for authenticated users versus 60/hr for shared cloud IPs. Token is never saved permanently.
            </p>
            <input
              type="password"
              value={customToken}
              onChange={(e) => setCustomToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3 py-1.5 bg-[#EDEDE9] border border-[#D6CCC2] rounded-lg font-mono text-xs text-[#2B2118] focus:outline-none focus:border-[#C96442]"
            />
          </div>
        )}

        {/* Quick Sample Profiles */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[#6B5B4E]">
          <span className="text-[#8C7B6E] font-medium">Or inspect notable profiles:</span>
          {SAMPLE_PROFILES.map((sample) => (
            <button
              key={sample.username}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setInputVal(sample.username);
                onSearch(sample.username, customToken || undefined);
              }}
              className="text-[#2B2118] hover:text-[#C96442] font-medium underline underline-offset-4 decoration-[#D6CCC2] hover:decoration-[#C96442] transition-colors cursor-pointer disabled:opacity-50"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Loading Progress Feedback */}
        {isLoading && (
          <div className="mt-8 max-w-lg mx-auto p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] text-left animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 className="w-5 h-5 text-[#C96442] animate-spin shrink-0" />
              <span className="text-sm font-semibold text-[#2B2118]">
                Forensic Analysis in Progress
              </span>
            </div>
            <p className="text-xs text-[#6B5B4E] pl-8 font-mono">
              {SCAN_STEPS[currentStepIdx]}
            </p>
            <div className="w-full bg-[#D6CCC2]/60 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#C96442] h-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, ((currentStepIdx + 1) / SCAN_STEPS.length) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="mt-6 max-w-lg mx-auto p-4 bg-[#FBEBE8] border border-[#F0BCB4] rounded-xl text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C96442] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#8C2C18] mb-1">
                  GitHub X-Ray Notice
                </h4>
                <p className="text-xs text-[#6B5B4E] mb-3">{error}</p>

                {/* Instant Recovery Actions */}
                <div className="p-3 bg-[#FAF5EE] rounded-lg border border-[#F0BCB4] space-y-2">
                  <span className="text-[11px] font-bold text-[#2B2118] block">
                    ⚡ Instant Showcase Options (Bypasses Rate Limits):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleInstantShowcase('shadcn')}
                      className="px-3 py-1 bg-[#C96442] hover:bg-[#B45535] text-[#FFFBF7] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Audit @shadcn Live
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInstantShowcase('torvalds')}
                      className="px-3 py-1 bg-[#EDEDE9] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Audit @torvalds Live
                    </button>
                    {onOpenAiShowcase && (
                      <button
                        type="button"
                        onClick={onOpenAiShowcase}
                        className="px-3 py-1 bg-[#EDEDE9] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Why API is Over
                      </button>
                    )}
                  </div>
                </div>

                {rateLimitReset && (
                  <p className="text-[11px] font-mono text-[#8C7B6E] mt-2">
                    Rate limit resets at: {new Date(rateLimitReset * 1000).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
