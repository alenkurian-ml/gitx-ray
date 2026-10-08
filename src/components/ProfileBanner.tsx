import React from 'react';
import { GitHubProfile, ProfileStats, AnalysisResult } from '../types';
import { ExternalLink, Calendar, MapPin, Building, Globe, Star, GitFork, BookOpen, UserCheck, Shield, Target } from 'lucide-react';

interface ProfileBannerProps {
  profile: GitHubProfile;
  stats: ProfileStats;
  analysis: AnalysisResult;
  onOpenEvidence: () => void;
  onOpenAiAnalysis?: () => void;
  onOpenRoleTargeting?: () => void;
  sourceMode?: 'live_api' | 'verified_snapshot' | 'web_gateway';
  rateLimitNotice?: string;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  profile,
  stats,
  analysis,
  onOpenEvidence,
  onOpenAiAnalysis,
  onOpenRoleTargeting,
  sourceMode,
  rateLimitNotice,
}) => {
  const score = analysis.overallSummary.profileHealthScore;
  
  // Calculate score color accent
  const getScoreColor = (val: number) => {
    if (val >= 80) return '#5B8266'; // Muted forest green
    if (val >= 60) return '#C96442'; // Warm orange
    return '#A34828'; // Rust red
  };

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-[#E3D5CA]">
        {/* User Info Column */}
        <div className="flex items-start gap-4 sm:gap-5">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.username}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-[#D6CCC2] object-cover shadow-xs shrink-0 bg-[#EDEDE9]"
          />
          <div>
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2B2118]">
                {profile.name || profile.username}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#C96442] hover:underline flex items-center gap-1 font-mono"
              >
                @{profile.username}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {profile.bio && (
              <p className="text-sm text-[#4A3B2C] max-w-2xl mb-3 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Unboxed Metadata row with subtle separators */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-[#6B5B4E]">
              {profile.company && (
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#8C7B6E]" />
                  <span>{profile.company}</span>
                </span>
              )}
              {profile.location && (
                <>
                  <span className="text-[#D6CCC2]">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C7B6E]" />
                    <span>{profile.location}</span>
                  </span>
                </>
              )}
              {profile.blog_url && (
                <>
                  <span className="text-[#D6CCC2]">·</span>
                  <a
                    href={profile.blog_url.startsWith('http') ? profile.blog_url : `https://${profile.blog_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#2B2118] hover:text-[#C96442] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#8C7B6E]" />
                    <span className="truncate max-w-[200px]">{profile.blog_url.replace(/^https?:\/\//, '')}</span>
                  </a>
                </>
              )}
              <span className="text-[#D6CCC2]">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C7B6E]" />
                <span className="tabular-nums">Account age: {profile.accountAgeYears} years</span>
              </span>
            </div>
          </div>
        </div>

        {/* Health Score & Perceived Seniority Box */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E3D5CA] gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-[#8C7B6E] font-medium">Profile Health</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#2B2118] tabular-nums">
                {score}<span className="text-sm text-[#8C7B6E] font-normal">/100</span>
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-mono text-xs font-bold"
              style={{
                borderColor: getScoreColor(score),
                color: getScoreColor(score),
                backgroundColor: '#FAF5EE',
              }}
            >
              {score}%
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-[11px] text-[#8C7B6E] block">Perceived Seniority</span>
            <span className="text-xs font-semibold text-[#2B2118]">
              {analysis.overallSummary.perceivedSeniority}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenRoleTargeting && (
              <button
                type="button"
                onClick={onOpenRoleTargeting}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDE9] hover:bg-[#E3D5CA] text-[#2B2118] border border-[#D6CCC2] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Target className="w-3.5 h-3.5 text-[#C96442]" />
                <span>Target a Role</span>
              </button>
            )}

            {onOpenAiAnalysis && (
              <button
                type="button"
                onClick={onOpenAiAnalysis}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C96442] hover:bg-[#B45535] text-[#FFFBF7] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>AI Analysis & Walkthrough</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenEvidence}
              className="text-xs text-[#6B5B4E] hover:text-[#2B2118] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Inspect Verified Raw Dossier
            </button>
          </div>
        </div>
      </div>

      {/* High Traffic / Gateway Notice */}
      {rateLimitNotice && (
        <div className="mt-4 p-3 bg-[#EDEDE9] border border-[#D6CCC2] rounded-xl text-xs text-[#4A3B2C] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5B8266] shrink-0" />
            <span>{rateLimitNotice}</span>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#C96442] shrink-0">
            Real Public Data · Audited Live by AI
          </span>
        </div>
      )}

      {/* Aggregate Signals Bar (Unboxed, clean tabular data) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 py-4 border-b border-[#E3D5CA]">
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Public Repos</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-[#C96442]" />
            {profile.public_repos_count}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Total Stars</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums flex items-center gap-1">
            <Star className="w-4 h-4 text-[#D9822B]" />
            {stats.totalStars.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Total Forks</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums flex items-center gap-1">
            <GitFork className="w-4 h-4 text-[#8C7B6E]" />
            {stats.totalForks.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Followers</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-[#5B8266]" />
            {profile.followers_count.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Original / Forks</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums">
            {stats.originalReposCount} / {stats.forkedReposCount}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#8C7B6E] block mb-0.5">Licensed Repos</span>
          <span className="text-lg font-semibold font-mono text-[#2B2118] tabular-nums flex items-center gap-1">
            <Shield className="w-4 h-4 text-[#8C7B6E]" />
            {stats.reposWithLicense}/{stats.reposInspectedCount}
          </span>
        </div>
      </div>

      {/* Language Breakdown */}
      {stats.topLanguages.length > 0 && (
        <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#6B5B4E]">
          <span className="text-[#8C7B6E] font-medium">Primary Stack:</span>
          {stats.topLanguages.slice(0, 6).map((lang, idx) => (
            <span key={lang.language} className="flex items-center gap-1">
              <span className="font-medium text-[#2B2118]">{lang.language}</span>
              <span className="text-[#8C7B6E] font-mono">({lang.count} repos)</span>
              {idx < Math.min(stats.topLanguages.length, 6) - 1 && (
                <span className="text-[#D6CCC2] ml-2">/</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Executive Headline & Narrative */}
      <div className="mt-5 pt-4 border-t border-[#E3D5CA]">
        <div className="text-xs font-semibold text-[#C96442] uppercase tracking-wider mb-1">
          Forensic Synthesis
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-[#2B2118] mb-2">
          {analysis.overallSummary.headline}
        </h3>
        <p className="text-sm text-[#4A3B2C] leading-relaxed">
          {analysis.overallSummary.narrative}
        </p>

        {/* Strengths & Weaknesses quick balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#E3D5CA]/60">
          <div>
            <h4 className="text-xs font-semibold text-[#5B8266] uppercase tracking-wider mb-2">
              Verified Strengths
            </h4>
            <ul className="space-y-1.5 text-xs text-[#36291E]">
              {analysis.overallSummary.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#5B8266] font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#A34828] uppercase tracking-wider mb-2">
              Critical Weaknesses
            </h4>
            <ul className="space-y-1.5 text-xs text-[#36291E]">
              {analysis.overallSummary.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#A34828] font-bold">✗</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
