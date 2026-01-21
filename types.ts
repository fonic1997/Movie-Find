
export interface UserPreferences {
  industry: string;
  location: string;
  platform: string;
  genre: string;
  mood: string;
  time: string;
}

export interface MovieAnalysis {
  overview: {
    title: string;
    industry: string;
    genre: string;
    runtime: string;
    availableOn: string;
  };
  ratings: {
    overall: string;
    audience: string;
    critic: string;
  };
  review: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    whoWatch: string;
    whoSkip: string;
  };
  sentiment: {
    positiveThemes: string[];
    complaints: string[];
    mood: string;
  };
  verdict: {
    worth: string;
    bestFor: string;
  };
  recommendations?: Array<{
    title: string;
    reason: string;
  }>;
}

export enum QueryType {
  REVIEW = 'REVIEW',
  RECOMMENDATION = 'RECOMMENDATION'
}
