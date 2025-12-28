export interface GuidelineInfoResponse {
  ticker: string;
  report: string;
  source: "llm" | "api";
}

interface GuidelineInfo {
    ticker: string;
    report: string;
}