import React from "react";
import {
  Activity,
  Newspaper,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyResponse } from "@/types/company";

interface NewsTabProps {
  selectedStock: CompanyResponse;
}

export const NewsTab: React.FC<NewsTabProps> = ({ selectedStock }) => {
  return (
    <div className="space-y-4">
      {/* Market Sentiment Summary */}
      <Card className="financial-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-foreground">
              Market Sentiment Summary
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success">
                {selectedStock.news.sentimentAnalysis.bullishOutOf100}%
              </div>
              <div className="text-sm text-muted-foreground">Bullish</div>
            </div>
            <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
              <div className="text-2xl font-bold text-warning">
                {selectedStock.news.sentimentAnalysis.neutralOutOf100}%
              </div>
              <div className="text-sm text-muted-foreground">Neutral</div>
            </div>
            <div className="text-center p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <div className="text-2xl font-bold text-destructive">
                {selectedStock.news.sentimentAnalysis.bearishOutOf100}%
              </div>
              <div className="text-sm text-muted-foreground">Bearish</div>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">
                {selectedStock.news.sentimentAnalysis.sentimentScoreOutOf5}/5
              </div>
              <div className="text-sm text-muted-foreground">
                Sentiment Score
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold text-foreground mb-4">
        Latest Market News & Analysis
      </h3>

      {/* News Items */}
      {selectedStock.news.recentNews.map((newsItem, index) => (
        <div
          key={index}
          className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
          onClick={() => window.open(`${newsItem.url}`, "_blank")}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`${
                    newsItem.score == "positive"
                      ? "px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full"
                      : "px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
                  }`}
                >
                  {newsItem.sectorImpact.toUpperCase()}
                </span>
                <span
                  className={
                    newsItem.score == "positive"
                      ? "text-xs text-green-500 font-medium"
                      : "text-xs text-red-500 font-medium"
                  }
                >
                  {newsItem.source}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {newsItem.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {newsItem.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <span className="flex items-center space-x-1">
                    <Newspaper className="w-3 h-3" />
                    <span>{newsItem.source}</span>
                  </span>
                  <span>•</span>
                  <span>recent news</span>
                  <span>•</span>
                  <span
                    className={`${
                      newsItem.score == "positive"
                        ? "flex items-center space-x-1 text-success"
                        : "flex items-center space-x-1 text-destructive"
                    }`}
                  >
                    {newsItem.score == "positive" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{newsItem.score}</span>
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
