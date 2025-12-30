
export interface Chapter {
  id: number;
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface BookSummary {
  title: string;
  authorAlias: string;
  executiveSummary: string;
  chapters: Chapter[];
  conclusion: string;
}

export interface TrendData {
  year: number;
  standalone: number;
  integrated: number;
}
