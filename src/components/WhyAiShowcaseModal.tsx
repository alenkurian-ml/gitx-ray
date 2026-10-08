import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Zap,
  ArrowRight,
  Database,
  Cpu,
  CheckCircle2,
  XCircle,
  Code2,
  Lock,
  GitPullRequest,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface WhyAiShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerLiveScan?: (username: string) => void;
}

export const WhyAiShowcaseModal: React.FC<WhyAiShowcaseModalProps> = ({
  isOpen,
  onClose,
  onTriggerLiveScan,
}) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'oauth_guide'>('comparison');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const SAMPLE_RAW_JSON = `{
  "login": "octocat",
  "public_repos": 8,
  "followers": 15200,
  "created_at": "2011-01-25T18:44:36Z",
  "updated_at": "2026-03-12T10:14:22Z"
}
/* Raw API tells you nothing about code quality,
   missing tests, or whether they can actually ship software. */`;

  const SAMPLE_AI_SYNTHESIS = `Executive Verdict:
"Senior Systems Architect with 15+ years active presence.
Flagship projects demonstrate high performance, but secondary
repositories suffer from 0% test coverage and missing CI/CD pipelines.
Immediate Screener Decision: Strong candidate, but requires verification
of automated regression testing habits."`;

  const OAUTH_SERVER_SNIPPET = `// 1. Redirect to GitHub OAuth
app.get('/api/auth/github/login', (req, res) => {
  const redirectUri = 'https://your-app.com/api/auth/github/callback';
  const url = 'https://github.com/login/oauth/authorize?' + new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: redirectUri,
    scope: 'read:user repo',
  });
  res.redirect(url);
});

// 2. Exchange code for 5,000 req/hr Access Token
app.get('/api/auth/github/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const { access_token } = await tokenRes.json();
  // Store token in encrypted session cookie
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF5EE] border border-[#D6CCC2] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E3D5CA] bg-[#EDEDE9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C96442] flex items-center justify-center text-[#FFFBF7] shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#2B2118]">
                  Showcase AI: Why Raw GitHub API is Over
                </h3>
              </div>
              <p className="text-xs text-[#6B5B4E]">
                Why counting stars and commits is dead — and how semantic reasoning changes developer evaluation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#8C7B6E] hover:text-[#2B2118] rounded-md hover:bg-[#D6CCC2]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4 bg-[#FAF5EE] border-b border-[#E3D5CA] flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-colors cursor-pointer ${
              activeTab === 'comparison'
                ? 'border-[#C96442] text-[#C96442] bg-[#EDEDE9]'
                : 'border-transparent text-[#6B5B4E] hover:text-[#2B2118]'
            }`}
          >
            Raw API vs. AI Intelligence
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('oauth_guide')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-colors cursor-pointer ${
              activeTab === 'oauth_guide'
                ? 'border-[#C96442] text-[#C96442] bg-[#EDEDE9]'
                : 'border-transparent text-[#6B5B4E] hover:text-[#2B2118]'
            }`}
          >
            How to Add GitHub Login (Roadmap)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'comparison' && (
            <>
              {/* Core Philosophy Banner */}
              <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                <h4 className="text-sm font-bold text-[#2B2118] mb-1">
                  The Fundamental Problem with the Raw GitHub API
                </h4>
                <p className="text-xs text-[#4A3B2C] leading-relaxed">
                  For 15 years, tools simply called GitHub's REST API and dumped flat vanity metrics: total stars, fork counts, and commit calendars. But <strong>vanity numbers lie</strong>: bots game commit squares, forks artificially inflate counts, and a 1,000-star repo might have zero tests and broken dependencies. The raw API provides data without understanding.
                </p>
              </div>

              {/* Side-by-Side Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional Raw API */}
                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#E8A598]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8C2C18] uppercase tracking-wider mb-3">
                    <XCircle className="w-4 h-4 text-[#8C2C18]" />
                    <span>Raw GitHub API (The Outdated Way)</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#4A3B2C]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C2C18] font-bold">✗</span>
                      <span><strong>Blind Commit Counts:</strong> Treats a 1-character typo fix the same as a distributed systems architectural refactor.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C2C18] font-bold">✗</span>
                      <span><strong>Flat Star Vanity:</strong> Cannot distinguish between a viral meme CSS trick and production enterprise software.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C2C18] font-bold">✗</span>
                      <span><strong>No Quality Verification:</strong> Sees a file named <code className="font-mono text-[11px]">test.js</code> but has no idea if it contains real assertions or is empty.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C2C18] font-bold">✗</span>
                      <span><strong>Zero Recruiter Context:</strong> Gives hiring managers 200 lines of JSON blobs with no hiring takeaway or action plan.</span>
                    </li>
                  </ul>

                  <div className="mt-4 pt-3 border-t border-[#E8A598]/60">
                    <span className="text-[10px] font-mono font-bold text-[#8C7B6E] block mb-1 uppercase">
                      Raw Output Example:
                    </span>
                    <pre className="p-2.5 bg-[#EDEDE9] rounded-lg text-[10px] font-mono text-[#8C2C18] overflow-x-auto leading-relaxed border border-[#D6CCC2]">
                      {SAMPLE_RAW_JSON}
                    </pre>
                  </div>
                </div>

                {/* AI Forensic Synthesis */}
                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#B4DFC1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#266336] uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#266336]" />
                    <span>AI Forensic Intelligence (GitHub X-Ray)</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#4A3B2C]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#266336] font-bold">✓</span>
                      <span><strong>Semantic Code Inspection:</strong> Inspects test runners, package scripts, and architecture trade-offs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#266336] font-bold">✓</span>
                      <span><strong>Authenticity Verification:</strong> Identifies whether projects are genuine original creations or uncredited tutorial clones.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#266336] font-bold">✓</span>
                      <span><strong>10-Second Recruiter Screen:</strong> Simulates how top hiring managers and staff engineers evaluate candidate credibility.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#266336] font-bold">✓</span>
                      <span><strong>Actionable Code Rescue:</strong> Doesn't just criticize; generates ready-to-copy CI/CD pipelines, READMEs, and tests.</span>
                    </li>
                  </ul>

                  <div className="mt-4 pt-3 border-t border-[#B4DFC1]/60">
                    <span className="text-[10px] font-mono font-bold text-[#266336] block mb-1 uppercase">
                      AI Reasoning Synthesis:
                    </span>
                    <div className="p-2.5 bg-[#EDEDE9] rounded-lg text-[10px] font-mono text-[#2B2118] leading-relaxed border border-[#D6CCC2]">
                      {SAMPLE_AI_SYNTHESIS}
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Axioms */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                  <span className="text-xs font-bold text-[#C96442] block mb-0.5">1. Metrics Are Blind</span>
                  <p className="text-[11px] text-[#6B5B4E]">
                    A developer with 50 stars and 100% test coverage with automated CI/CD is more reliable than one with 2,000 unmaintained stars.
                  </p>
                </div>
                <div className="p-3 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                  <span className="text-xs font-bold text-[#C96442] block mb-0.5">2. Synthesis Over Dumps</span>
                  <p className="text-[11px] text-[#6B5B4E]">
                    Engineers don't need another table of commit timestamps. They need to know why their profile isn't getting interviews.
                  </p>
                </div>
                <div className="p-3 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                  <span className="text-xs font-bold text-[#C96442] block mb-0.5">3. Prescriptive Rescue</span>
                  <p className="text-[11px] text-[#6B5B4E]">
                    AI closes the loop by providing the exact <code className="text-[#2B2118]">.yml</code> and Markdown files needed to fix the gaps.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'oauth_guide' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                <h4 className="text-sm font-bold text-[#2B2118] mb-1">
                  How to Add GitHub OAuth Login (Complete Roadmap)
                </h4>
                <p className="text-xs text-[#6B5B4E]">
                  If you choose to add GitHub Login to this application, here is the exact architectural blueprint, setup steps, and advantages:
                </p>
              </div>

              {/* Steps to Add GitHub Login */}
              <div className="space-y-3">
                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C96442] text-[#FFFBF7] text-xs font-bold flex items-center justify-center font-mono">
                      1
                    </span>
                    <h5 className="text-xs font-bold text-[#2B2118]">
                      Register a GitHub OAuth App
                    </h5>
                  </div>
                  <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                    Go to <strong>GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App</strong>:
                  </p>
                  <ul className="text-xs text-[#6B5B4E] space-y-1 font-mono pl-7">
                    <li>• Application Name: <strong className="text-[#2B2118]">GitHub X-Ray</strong></li>
                    <li>• Homepage URL: <strong className="text-[#2B2118]">https://your-domain.com</strong></li>
                    <li>• Authorization Callback URL: <strong className="text-[#2B2118]">https://your-domain.com/api/auth/github/callback</strong></li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C96442] text-[#FFFBF7] text-xs font-bold flex items-center justify-center font-mono">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-[#2B2118]">
                      Store Client Credentials in Server Environment (.env)
                    </h5>
                  </div>
                  <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                    GitHub will generate a <strong>Client ID</strong> and <strong>Client Secret</strong>. Keep these strictly on the server:
                  </p>
                  <pre className="p-2.5 bg-[#EDEDE9] rounded-lg text-xs font-mono text-[#2B2118] border border-[#D6CCC2]">
                    {`GITHUB_CLIENT_ID="Iv1.xxxxxxxxx"\nGITHUB_CLIENT_SECRET="xxxxxxxxxxxxxxxxxxxx"`}
                  </pre>
                </div>

                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#C96442] text-[#FFFBF7] text-xs font-bold flex items-center justify-center font-mono">
                        3
                      </span>
                      <h5 className="text-xs font-bold text-[#2B2118]">
                        Implement the 2 Backend Server Routes (Express)
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('oauth-code', OAUTH_SERVER_SNIPPET)}
                      className="flex items-center gap-1 px-2 py-1 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-medium text-[#2B2118] rounded-md transition-colors cursor-pointer"
                    >
                      {copiedKey === 'oauth-code' ? <Check className="w-3.5 h-3.5 text-[#5B8266]" /> : <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />}
                      <span>{copiedKey === 'oauth-code' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#2B2118] text-[#FAF5EE] rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-[#3A2C20]">
                    {OAUTH_SERVER_SNIPPET}
                  </pre>
                </div>

                {/* What Changes When You Add Login */}
                <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
                  <h5 className="text-xs font-bold text-[#2B2118] mb-2">
                    What Powers Unlock When Adding GitHub Login:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#36291E]">
                    <div className="p-2.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
                      <strong className="text-[#C96442] block">5,000 req/hr Limit</strong>
                      <span>Unauthenticated limit is 60 req/hr. Logged-in OAuth users receive 5,000 req/hr instantly.</span>
                    </div>
                    <div className="p-2.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
                      <strong className="text-[#C96442] block">Private Repositories</strong>
                      <span>Ability to audit internal enterprise or private portfolio projects securely.</span>
                    </div>
                    <div className="p-2.5 bg-[#FAF5EE] rounded-lg border border-[#D6CCC2]">
                      <strong className="text-[#C96442] block">1-Click Auto-Fix PR</strong>
                      <span>App can automatically create a branch and open a PR adding CI/CD or README directly!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EDEDE9] border-t border-[#E3D5CA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5B4E]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2B2118]">⚡ Test Live AI Audit Now:</span>
            {onTriggerLiveScan && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTriggerLiveScan('shadcn');
                  }}
                  className="px-2.5 py-1 bg-[#C96442] hover:bg-[#B45535] text-[#FFFBF7] font-semibold rounded-md transition-colors cursor-pointer"
                >
                  @shadcn
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTriggerLiveScan('torvalds');
                  }}
                  className="px-2.5 py-1 bg-[#FAF5EE] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] font-semibold rounded-md transition-colors cursor-pointer"
                >
                  @torvalds
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF5EE] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close Showcase
          </button>
        </div>
      </div>
    </div>
  );
};
