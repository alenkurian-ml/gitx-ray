export interface GitHubProfile {
  username: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog_url: string | null;
  twitter_username: string | null;
  public_repos_count: number;
  public_gists_count: number;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  accountAgeYears: number;
}

export interface ProfileStats {
  totalStars: number;
  totalForks: number;
  totalOpenIssues: number;
  reposInspectedCount: number;
  originalReposCount: number;
  forkedReposCount: number;
  reposWithDescription: number;
  reposWithLicense: number;
  topLanguages: Array<{ language: string; count: number }>;
}

export interface DeepInspectedRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  size_kb: number;
  hasReadme: boolean;
  readmeLength: number;
  readmeSnippet: string;
  hasLicense: boolean;
  licenseName: string | null;
  hasGitignore: boolean;
  hasWorkflows: boolean;
  workflowFiles: string[];
  hasTests: boolean;
  testSignalsFound: string[];
  dependencyFiles: string[];
  packageScripts: Record<string, string> | null;
  dependenciesCount: number;
  devDependenciesCount: number;
}

export interface RepositorySummary {
  name: string;
  description: string | null;
  fork: boolean;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
  hasLicense: boolean;
}

export interface FactualData {
  profile: GitHubProfile;
  stats: ProfileStats;
  repositoriesSummary: RepositorySummary[];
  deepInspectedRepos: DeepInspectedRepo[];
}

export interface DimensionAssessment {
  score: number;
  assessment: string;
}

export interface ProblemItem {
  problem: string;
  evidence: string;
  whyItMatters: string;
  howToFix: string;
  severity: 'critical' | 'warning' | 'opportunity' | string;
}

export interface RepoAnalysisItem {
  name: string;
  verdict: string;
  docQuality: string;
  engineeringQuality: string;
  testingSignal: string;
  securitySignal: string;
  specificRecommendations: string[];
}

export interface RescueStep {
  title: string;
  action: string;
  deliverable: string;
}

export interface RescuePhase {
  phase: string;
  timeframe: string;
  objective: string;
  steps: RescueStep[];
}

export interface AnalysisResult {
  overallSummary: {
    headline: string;
    narrative: string;
    perceivedSeniority: string;
    profileHealthScore: number;
    strengths: string[];
    weaknesses: string[];
  };
  recruiterImpression: {
    tenSecondTakeaway: string;
    greenFlags: string[];
    redFlags: string[];
    passOrFailReasoning: string;
  };
  dimensionScores: {
    projectQuality: DimensionAssessment;
    documentationQuality: DimensionAssessment;
    engineeringQuality: DimensionAssessment;
    testingSignals: DimensionAssessment;
    maintenanceActivity: DimensionAssessment;
    securitySignals: DimensionAssessment;
  };
  strongestProjects: Array<{
    repoName: string;
    whyStrong: string;
    keyHighlight: string;
  }>;
  weakestProjects: Array<{
    repoName: string;
    whyWeak: string;
    suggestedAction: string;
  }>;
  biggestProblems: ProblemItem[];
  repositoryAnalyses: RepoAnalysisItem[];
  priorityImprovements: {
    quickWins: string[];
    highImpact: string[];
    structuralUpgrades: string[];
  };
  rescuePlan: RescuePhase[];
}

export interface XRayResponse {
  factualData: FactualData;
  analysis: AnalysisResult;
  fromCache?: boolean;
  sourceMode?: 'live_api' | 'verified_snapshot' | 'web_gateway';
  rateLimitNotice?: string;
}
