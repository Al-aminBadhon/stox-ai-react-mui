// --- Company Info ---
export interface CompanyInfo {
  name: string;
  founded: string;
  ceo: string;
  headquarters: string;
  industry: string;
  marketCap: string;
  peRatio: string;
  customers: string;
  summary: string;
  products: string[];
  source: "llm" | "api";
}

// --- Sentiment Analysis ---
export interface SentimentAnalysis {
  bullishOutOf100: string;
  bearishOutOf100: string;
  neutralOutOf100: string;
  sentimentScoreOutOf5: string;
}

// --- News Item ---
export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  sectorImpact: string;
  score: "positive" | "negative";
}

// --- News Wrapper ---
export interface NewsData {
  sentiment: "Positive" | "Negative" | "Neutral";
  overallMarketSummary: string;
  sentimentAnalysis: SentimentAnalysis;
  recentNews: NewsItem[];
}

// --- FULL API RESPONSE ---
export interface CompanyResponse {
  ticker: string;
  companyInfo: CompanyInfo;
  news: NewsData;
}
