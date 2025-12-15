export interface StrategySection {
  intent: string;
  paa: string[];
  relatedQueries: string[];
  demographics: string;
  summary: string;
}

export interface GapAnalysisSection {
  competitorAnalysis: string;
  gaps: string[];
  opportunities: string;
}

export interface OutlineSection {
  headingHierarchy: string; // Markdown list format
  faqTopics: string[];
  ctaSuggestion: string;
}

export interface Source {
  title: string;
  url: string;
}

export interface AnalysisResult {
  strategy: StrategySection;
  gapAnalysis: GapAnalysisSection;
  outline: OutlineSection;
  sources?: Source[];
}

export interface ContentResult {
  markdown: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  ANALYSIS_COMPLETED = 'ANALYSIS_COMPLETED',
  WRITING = 'WRITING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}