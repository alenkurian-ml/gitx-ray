import React, { useState } from 'react';
import { DeepInspectedRepo, RepoAnalysisItem } from '../types';
import {
  FileCode,
  FileText,
  CheckCircle2,
  XCircle,
  GitPullRequest,
  Star,
  GitFork,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Workflow,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface RepoInspectionGridProps {
  deepRepos: DeepInspectedRepo[];
  analyses: RepoAnalysisItem[];
}

export const RepoInspectionGrid: React.FC<RepoInspectionGridProps> = ({
  deepRepos,
  analyses,
}) => {
  const [expandedRepo, setExpandedRepo] = useState<string | null>(deepRepos[0]?.name || null);

  const toggleExpand = (name: string) => {
    setExpandedRepo((prev) => (prev === name ? null : name));
  };

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#2B2118] mb-1">
          Deep Repository Inspection
        </h3>
        <p className="text-xs text-[#6B5B4E]">
          File-by-file verification of test suites, GitHub workflows, README depth, and security configurations
        </p>
      </div>

      <div className="space-y-4">
        {deepRepos.map((repo) => {
          const analysis = analyses.find((a) => a.name.toLowerCase() === repo.name.toLowerCase());
          const isExpanded = expandedRepo === repo.name;

          return (
            <div
              key={repo.id}
              className="border border-[#D6CCC2] bg-[#EDEDE9] rounded-xl overflow-hidden transition-all"
            >
              {/* Repo Summary Header */}
              <div
                onClick={() => toggleExpand(repo.name)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF5EE]/70 transition-colors"
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start gap-3">
                  <FileCode className="w-5 h-5 text-[#C96442] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-base text-[#2B2118] font-mono">
                        {repo.name}
                      </span>
                      {repo.language && (
                        <span className="text-xs text-[#6B5B4E] font-medium">
                          · {repo.language}
                        </span>
                      )}
                      {repo.fork && (
                        <span className="text-[11px] text-[#8C7B6E] font-mono">
                          (Fork)
                        </span>
                      )}
                    </div>
                    {repo.description ? (
                      <p className="text-xs text-[#4A3B2C] line-clamp-1 max-w-xl">
                        {repo.description}
                      </p>
                    ) : (
                      <p className="text-xs text-[#A34828] italic">
                        Missing repository description
                      </p>
                    )}
                  </div>
                </div>

                {/* Signals Bar & Action */}
                <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#D6CCC2]/60">
                  <div className="flex items-center gap-3 text-xs text-[#6B5B4E] font-mono tabular-nums">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#D9822B]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[#8C7B6E]" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {/* Micro Signals Status */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span
                      title={repo.hasTests ? 'Automated tests detected' : 'No test files detected'}
                      className={`flex items-center gap-1 ${
                        repo.hasTests ? 'text-[#5B8266]' : 'text-[#A34828]'
                      }`}
                    >
                      {repo.hasTests ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">Tests</span>
                    </span>

                    <span
                      title={repo.hasWorkflows ? 'CI/CD workflows present' : 'No GitHub workflows detected'}
                      className={`flex items-center gap-1 ${
                        repo.hasWorkflows ? 'text-[#5B8266]' : 'text-[#8C7B6E]'
                      }`}
                    >
                      {repo.hasWorkflows ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">CI/CD</span>
                    </span>

                    <span
                      title={repo.hasReadme ? `README length: ${repo.readmeLength} bytes` : 'Missing README'}
                      className={`flex items-center gap-1 ${
                        repo.hasReadme ? 'text-[#5B8266]' : 'text-[#A34828]'
                      }`}
                    >
                      {repo.hasReadme ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">README</span>
                    </span>
                  </div>

                  <div className="text-[#8C7B6E]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detailed Inspection */}
              {isExpanded && (
                <div className="p-5 border-t border-[#D6CCC2] bg-[#FAF5EE]">
                  {/* Verified File Evidence Checklist */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs">
                    <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]">
                      <span className="text-[#8C7B6E] block mb-1">Documentation</span>
                      {repo.hasReadme ? (
                        <div className="text-[#5B8266] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono tabular-nums">{repo.readmeLength.toLocaleString()} bytes</span>
                        </div>
                      ) : (
                        <div className="text-[#A34828] font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>No README</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]">
                      <span className="text-[#8C7B6E] block mb-1">Test Suite</span>
                      {repo.hasTests ? (
                        <div className="text-[#5B8266] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate" title={repo.testSignalsFound.join(', ')}>
                            {repo.testSignalsFound[0] || 'Detected'}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[#A34828] font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>0 Test Files</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]">
                      <span className="text-[#8C7B6E] block mb-1">CI/CD Workflows</span>
                      {repo.hasWorkflows ? (
                        <div className="text-[#5B8266] font-medium flex items-center gap-1">
                          <Workflow className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate" title={repo.workflowFiles.join(', ')}>
                            {repo.workflowFiles.length} workflow file(s)
                          </span>
                        </div>
                      ) : (
                        <div className="text-[#8C7B6E] font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>None configured</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]">
                      <span className="text-[#8C7B6E] block mb-1">License & .gitignore</span>
                      <div className="flex flex-col gap-0.5">
                        <span className={repo.hasLicense ? 'text-[#5B8266]' : 'text-[#A34828]'}>
                          {repo.licenseName || 'No License'}
                        </span>
                        <span className={repo.hasGitignore ? 'text-[#5B8266]' : 'text-[#A34828]'}>
                          {repo.hasGitignore ? '.gitignore ✓' : 'No .gitignore ✗'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dependencies & Package scripts if available */}
                  {repo.packageScripts && Object.keys(repo.packageScripts).length > 0 && (
                    <div className="mb-5 p-3.5 bg-[#EDEDE9] rounded-lg border border-[#D6CCC2]">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2118] mb-2">
                        <Terminal className="w-3.5 h-3.5 text-[#C96442]" />
                        <span>Inspected Scripts (from package.json):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[11px]">
                        {Object.entries(repo.packageScripts).slice(0, 6).map(([cmd, script]) => (
                          <div key={cmd} className="bg-[#FAF5EE] p-2 rounded border border-[#D6CCC2]/60 truncate">
                            <span className="text-[#C96442] font-semibold">{cmd}: </span>
                            <span className="text-[#6B5B4E]">{script}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Forensic Verdict for this repo */}
                  {analysis && (
                    <div className="p-4 bg-[#FAF5EE] rounded-lg border border-[#E3D5CA]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#C96442] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Forensic Verdict
                        </span>
                        <span className="text-xs text-[#2B2118] font-semibold">
                          {analysis.verdict}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#36291E] mb-3">
                        <div>
                          <strong className="text-[#2B2118]">Engineering Hygiene: </strong>
                          {analysis.engineeringQuality}
                        </div>
                        <div>
                          <strong className="text-[#2B2118]">Documentation Status: </strong>
                          {analysis.docQuality}
                        </div>
                      </div>

                      {/* Specific Recommendations */}
                      {analysis.specificRecommendations.length > 0 && (
                        <div className="pt-3 border-t border-[#E3D5CA]/80">
                          <span className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider block mb-1.5">
                            Fix Recommendations for {repo.name}:
                          </span>
                          <ul className="space-y-1 text-xs text-[#36291E]">
                            {analysis.specificRecommendations.map((rec, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <span className="text-[#C96442] font-bold">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* View on GitHub link */}
                  <div className="mt-4 flex justify-end">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#C96442] hover:text-[#B45535] flex items-center gap-1 transition-colors"
                    >
                      View {repo.name} on GitHub
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
