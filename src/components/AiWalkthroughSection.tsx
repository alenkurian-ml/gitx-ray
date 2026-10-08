import React, { useState } from 'react';
import { FactualData, AnalysisResult } from '../types';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Terminal,
  FileCode,
  Shield,
  Layers,
  ChevronRight,
  ChevronLeft,
  Workflow,
  BookOpen,
} from 'lucide-react';

interface AiWalkthroughSectionProps {
  factualData: FactualData;
  analysis: AnalysisResult;
}

export const AiWalkthroughSection: React.FC<AiWalkthroughSectionProps> = ({
  factualData,
  analysis,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const profile = factualData.profile;
  const stats = factualData.stats;
  const deepRepos = factualData.deepInspectedRepos;
  const primaryLang = stats.topLanguages[0]?.language || 'TypeScript';
  const flagshipRepo = deepRepos[0]?.name || (profile.public_repos_count > 0 ? 'primary-project' : 'portfolio-app');

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleStepCompleted = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Generate customized files and snippets based on real profile data
  const customBio = profile.bio
    ? `Senior ${primaryLang} Engineer building production applications. Maintaining open source & developer tooling.`
    : `Software Engineer specializing in ${primaryLang}. Building reliable, tested web applications.`;

  const customProfileReadme = `# Hi, I'm ${profile.name || profile.username} 👋

${profile.bio || `Software engineer building high-impact tools with ${primaryLang}.`}

### 🚀 What I'm Building
- 🌟 **${flagshipRepo}**: Flagship repository with active development and public release.
- 🛠️ Specializing in: ${stats.topLanguages.slice(0, 4).map((l) => `\`${l.language}\``).join(' · ')}

### 📊 Engineering Philosophy
- **Clean Architecture**: Modular, maintainable components with clear interfaces.
- **Verification First**: Automated test suites and strict type validation.
- **Continuous Delivery**: GitHub Actions CI/CD automation on every pull request.

📫 **Connect**: ${profile.blog_url || `github.com/${profile.username}`}
`;

  const customCiWorkflow = `name: Continuous Integration & Test

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  validate-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Source Code
      uses: actions/checkout@v4

    - name: Set up Runtime Environment
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Run Linter & Typecheck
      run: npm run lint --if-present

    - name: Execute Automated Test Suite
      run: npm test --if-present
`;

  const customTestSnippet = `// tests/core.test.ts
import { describe, it, expect } from 'vitest';

describe('${flagshipRepo} Core System', () => {
  it('should initialize successfully with valid configuration', () => {
    const config = { active: true, version: '1.0.0' };
    expect(config.active).toBe(true);
    expect(config.version).toBe('1.0.0');
  });

  it('should handle edge cases without throwing unhandled exceptions', () => {
    const sanitizeInput = (val: string) => val.trim().toLowerCase();
    expect(sanitizeInput('  GitHub-XRay  ')).toBe('github-xray');
  });
});
`;

  const customGitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production build outputs
dist/
build/
.next/
out/

# Environment variables & secrets (CRITICAL)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS metadata
.DS_Store
Thumbs.db
`;

  // 6 Structured Enhancement Steps
  const STEPS = [
    {
      title: 'Step 1: Profile & Identity Polish',
      category: 'Profile Branding',
      icon: BookOpen,
      diagnostic: `Account created ${profile.accountAgeYears} years ago with ${profile.public_repos_count} public repos. ${
        profile.bio ? 'Existing bio present.' : 'Bio is currently missing.'
      }`,
      objective: 'Create an authoritative first impression for recruiters and open-source visitors.',
      recommendation:
        'Refine your public bio to clearly state your seniority and primary stack. Next, launch your special username/username repository to establish a personal engineering landing page.',
      codeTitle: 'Special Profile README.md (Create in repository: ' + profile.username + '/' + profile.username + ')',
      code: customProfileReadme,
      quickAction: 'Set Bio: "' + customBio + '"',
    },
    {
      title: 'Step 2: Flagship Repository Elevation',
      category: 'Project Architecture',
      icon: Layers,
      diagnostic: `Flagship anchor is "${flagshipRepo}". Analysis identified opportunities to strengthen documentation and setup reproducibility.`,
      objective: `Transform "${flagshipRepo}" into an undeniable showcase of your software craft.`,
      recommendation:
        'Every top repository needs: 1) A 1-sentence value proposition, 2) A GIF or screenshot of the working app, 3) Architecture decisions or trade-offs, and 4) A 3-command local setup path.',
      codeTitle: 'Flagship README Header Template',
      code: `# ${flagshipRepo}

> High-performance solution built with ${primaryLang}.

## ✨ Overview
Describe the core problem this project solves in 2-3 sentences. Explain who benefits and why alternative solutions fall short.

## 🚀 Quickstart
\`\`\`bash
# 1. Clone repository
git clone https://github.com/${profile.username}/${flagshipRepo}.git

# 2. Install dependencies
npm install

# 3. Start local development
npm run dev
\`\`\`

## 🏗️ Architecture & Trade-Offs
- **Design Pattern**: Explain modular structure
- **Key Bottleneck Solved**: How latency or state synchronization was addressed
`,
      quickAction: 'Pin ' + flagshipRepo + ' as one of your 4 featured repositories on GitHub.',
    },
    {
      title: 'Step 3: Verification & Test Rigor Injection',
      category: 'Engineering Rigor',
      icon: Terminal,
      diagnostic: `${
        deepRepos.filter((r) => r.hasTests).length > 0
          ? 'Automated tests detected in some repositories.'
          : 'Zero automated test suites detected across sampled core repositories.'
      }`,
      objective: 'Eliminate the #1 hiring screener red flag by proving code is verified and regression-proof.',
      recommendation:
        'Install a modern runner like Vitest or Jest. Add a "test" script to package.json and commit 2-3 unit tests covering core utilities or API parsing.',
      codeTitle: 'Starter Unit Test Suite (tests/core.test.ts)',
      code: customTestSnippet,
      quickAction: 'Run in terminal: npm install -D vitest && add "test": "vitest run" in package.json',
    },
    {
      title: 'Step 4: Continuous Delivery & CI Automation',
      category: 'DevOps & Tooling',
      icon: Workflow,
      diagnostic: `${
        deepRepos.some((r) => r.hasWorkflows)
          ? 'GitHub Workflows present in some projects.'
          : 'No GitHub Actions CI/CD workflows detected in core repositories.'
      }`,
      objective: 'Automate build, lint, and test validation on every git push and pull request.',
      recommendation:
        'Add a .github/workflows/ci.yml configuration. This creates green checkmarks next to your commits, signalling production DevOps maturity.',
      codeTitle: '.github/workflows/ci.yml',
      code: customCiWorkflow,
      quickAction: 'Commit this file to .github/workflows/ci.yml on your main branch.',
    },
    {
      title: 'Step 5: Security, Licenses & Hygiene Seal',
      category: 'Security & Legal',
      icon: Shield,
      diagnostic: `${stats.reposWithLicense} of ${stats.reposInspectedCount} repos have licenses. ${
        stats.reposWithDescription
      } of ${stats.reposInspectedCount} repos have descriptions.`,
      objective: 'Ensure zero credential leaks, clear open-source copyright, and spotless repository hygiene.',
      recommendation:
        'Ensure .gitignore blocks .env files and API keys. Add an MIT License so other developers and companies can legally view and try your code.',
      codeTitle: 'Production .gitignore Configuration',
      code: customGitignore,
      quickAction: 'Verify that no .env files or secret tokens have ever been committed.',
    },
    {
      title: 'Step 6: Pinned Repository Strategy & Curation',
      category: 'Recruiter Showcase',
      icon: Sparkles,
      diagnostic: `Total of ${stats.originalReposCount} original repositories and ${stats.forkedReposCount} forks.`,
      objective: 'Direct 100% of visitor attention to your 4 highest-quality original projects.',
      recommendation:
        'Never let dead tutorial clones or abandoned forks sit on your profile front page. Curate your 4 pinned repositories: 1 full-stack app, 1 library/tool, 1 complex architectural project, and 1 community contribution.',
      codeTitle: 'Ideal 4-Project Portfolio Matrix',
      code: `Pinned Project 1: Flagship Web Application (Full-Stack + Auth + Database)
Pinned Project 2: Developer Tooling / CLI / NPM Package (${primaryLang})
Pinned Project 3: High-Performance Architecture / Algorithm / Systems Design
Pinned Project 4: Notable Open Source Contribution / Fork with Merged PR
`,
      quickAction: 'Go to github.com/' + profile.username + ' → Customize your pins → Select your top 4 projects.',
    },
  ];

  const currentStep = STEPS[currentStepIndex];
  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / STEPS.length) * 100);

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E3D5CA]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C96442] flex items-center justify-center text-[#FFFBF7] shadow-sm shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#2B2118]">
                AI Account Enhancement Walkthrough
              </h3>
              <span className="text-[11px] font-mono text-[#5B8266] bg-[#EDEDE9] px-2 py-0.5 rounded border border-[#D6CCC2]">
                Customized for @{profile.username}
              </span>
            </div>
            <p className="text-xs text-[#6B5B4E] mt-0.5">
              The AI Engine audited all verified signals. Follow this surgical step-by-step walkthrough to elevate profile credibility.
            </p>
          </div>
        </div>

        {/* Overall Completion Metric */}
        <div className="flex items-center gap-3 bg-[#EDEDE9] px-3.5 py-2 rounded-xl border border-[#D6CCC2] self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] text-[#8C7B6E] uppercase font-bold block">
              Enhancement Progress
            </span>
            <span className="text-xs font-bold text-[#2B2118] font-mono tabular-nums">
              {totalCompleted} of {STEPS.length} Completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-[#C96442] flex items-center justify-center text-[11px] font-bold font-mono text-[#C96442]">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Stepper Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {STEPS.map((s, idx) => {
          const isSelected = idx === currentStepIndex;
          const isDone = !!completedSteps[idx];

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#FAF5EE] border-[#C96442] ring-1 ring-[#C96442]/30 shadow-xs'
                  : isDone
                  ? 'bg-[#EDEDE9]/80 border-[#5B8266]/40 text-[#6B5B4E]'
                  : 'bg-[#EDEDE9] border-[#D6CCC2] text-[#6B5B4E] hover:border-[#C96442]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-[#8C7B6E]">
                  0{idx + 1}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8266]" />}
              </div>
              <span
                className={`text-xs font-semibold line-clamp-1 ${
                  isSelected ? 'text-[#C96442]' : 'text-[#2B2118]'
                }`}
              >
                {s.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Container */}
      <div className="p-6 bg-[#EDEDE9] rounded-2xl border border-[#D6CCC2] transition-all">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#D6CCC2]">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#C96442] uppercase tracking-wider block mb-1">
              Step {currentStepIndex + 1} of {STEPS.length} · {currentStep.category}
            </span>
            <h4 className="text-lg font-bold text-[#2B2118]">
              {currentStep.title}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleStepCompleted(currentStepIndex)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                completedSteps[currentStepIndex]
                  ? 'bg-[#EBF5EE] border-[#B4DFC1] text-[#266336]'
                  : 'bg-[#FAF5EE] border-[#D6CCC2] text-[#2B2118] hover:bg-[#E3D5CA]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>
                {completedSteps[currentStepIndex] ? 'Completed ✓' : 'Mark Step as Done'}
              </span>
            </button>
          </div>
        </div>

        {/* Diagnostic & Evidence Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-xs">
          <div className="p-3.5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
            <span className="text-[10px] font-bold text-[#8C7B6E] uppercase tracking-wider block mb-1">
              Factual Diagnostic from Scan
            </span>
            <p className="text-[#36291E] font-mono leading-relaxed">
              {currentStep.diagnostic}
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
            <span className="text-[10px] font-bold text-[#C96442] uppercase tracking-wider block mb-1">
              Improvement Objective
            </span>
            <p className="text-[#36291E] leading-relaxed">
              {currentStep.objective}
            </p>
          </div>
        </div>

        {/* Detailed Recommendation Prose */}
        <div className="mb-5 p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
          <h5 className="text-xs font-bold text-[#2B2118] mb-1.5">
            Architectural Action Guide:
          </h5>
          <p className="text-xs text-[#4A3B2C] leading-relaxed">
            {currentStep.recommendation}
          </p>
        </div>

        {/* Ready-to-Copy File / Snippet */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2B2118] flex items-center gap-1.5 font-mono">
              <FileCode className="w-4 h-4 text-[#C96442]" />
              {currentStep.codeTitle}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(`step-${currentStepIndex}`, currentStep.code)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF5EE] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-medium text-[#2B2118] rounded-md transition-colors cursor-pointer"
            >
              {copiedKey === `step-${currentStepIndex}` ? (
                <Check className="w-3.5 h-3.5 text-[#5B8266]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />
              )}
              <span>{copiedKey === `step-${currentStepIndex}` ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 bg-[#2B2118] text-[#FAF5EE] rounded-xl text-xs font-mono overflow-x-auto border border-[#3A2C20] leading-relaxed max-h-80">
            {currentStep.code}
          </pre>
        </div>

        {/* Immediate Quick Action Callout */}
        <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#C96442]/30 flex items-center justify-between text-xs text-[#2B2118]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C96442] shrink-0" />
            <span>
              <strong className="text-[#C96442]">Action Item: </strong>
              {currentStep.quickAction}
            </span>
          </div>
        </div>

        {/* Step Navigation Controls (Prev / Next) */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D6CCC2]">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF5EE] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs font-mono text-[#8C7B6E]">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>

          <button
            type="button"
            disabled={currentStepIndex === STEPS.length - 1}
            onClick={() => setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-[#C96442] hover:bg-[#B45535] text-[#FFFBF7] text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
