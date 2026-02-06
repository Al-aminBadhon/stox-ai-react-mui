import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  ArrowUp,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnalystPredictions } from "@/types/analystInfo";

interface PredictionsTabProps {
  predictions: AnalystPredictions | null;
  loading: boolean;
}

export const PredictionsTab: React.FC<PredictionsTabProps> = ({
  predictions,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-muted-foreground">
            Loading predictions...
          </p>
        </div>
      </div>
    );
  }

  if (!predictions) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-muted-foreground">
          No predictions available
        </p>
      </div>
    );
  }

  return (
    <Card className="financial-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Analyst Forecasts & Market Sentiment
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Real-time Analysis</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Top Row: 2x2 Metrics + Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: 2x2 Metrics Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {/* Average Target */}
                <Card className="border-border/50 bg-background/50">
                  <CardContent className="p-5 text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      ${predictions?.analystInfo?.avgTargetPrice}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Target
                    </div>
                    <div className="text-xs text-success flex items-center justify-center mt-2">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +2.3% from current
                    </div>
                  </CardContent>
                </Card>

                {/* Consensus Rating */}
                <Card className="border-border/50 bg-background/50">
                  <CardContent className="p-5 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {predictions?.analystInfo?.rating.toUpperCase()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Consensus Rating
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      42 analysts
                    </div>
                  </CardContent>
                </Card>

                {/* Upside Potential */}
                <Card className="border-border/50 bg-background/50">
                  <CardContent className="p-5 text-center">
                    <div className="text-2xl font-bold text-warning mb-1">
                      {predictions?.analystInfo?.upsidePotential}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Upside Potential
                    </div>
                    <div className="text-xs text-warning flex items-center justify-center mt-2">
                      <Target className="w-3 h-3 mr-1" />
                      High confidence
                    </div>
                  </CardContent>
                </Card>

                {/* Current Price */}
                <Card className="border-border/50 bg-background/50">
                  <CardContent className="p-5 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {predictions?.analystInfo?.currentPrice}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Price
                    </div>
                    <div className="text-xs text-success flex items-center justify-center mt-2">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +1.8% today
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Market sentiment */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 bg-background/50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-4">
                    Market Sentiment
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">Bullish</span>
                      </div>
                      <span className="text-sm text-muted-foreground">72%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                      <div className="flex items-center space-x-2">
                        <Minus className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">Neutral</span>
                      </div>
                      <span className="text-sm text-muted-foreground">18%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-medium">Bearish</span>
                      </div>
                      <span className="text-sm text-muted-foreground">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Target Range */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 bg-background/50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-4">
                    Price Target Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Low Target
                      </span>
                      <span className="text-sm font-medium text-destructive">
                        {predictions?.analystInfo?.lowestTargetPrice}
                      </span>
                    </div>

                    <div className="relative pt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-destructive via-warning to-success h-2 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$150</span>
                        <span className="text-foreground font-medium">
                          Current: {predictions?.analystInfo?.currentPrice}
                        </span>
                        <span>$210</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        High Target
                      </span>
                      <span className="text-sm font-medium text-success">
                        {predictions?.analystInfo?.highestTargetPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analyst Recommendations */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 bg-background/50 h-full">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-4">
                    Analyst Recommendations
                  </h4>
                  <div className="space-y-4">
                    {/* Strong Buy */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium">
                            Strong Buy
                          </span>
                        </div>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Buy */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Buy</span>
                        </div>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Hold */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Minus className="w-4 h-4 text-warning" />
                          <span className="text-sm font-medium">Hold</span>
                        </div>
                        <span className="text-sm font-semibold">8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-warning h-2 rounded-full"
                          style={{ width: "8%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Sell */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="w-4 h-4 text-destructive" />
                          <span className="text-sm font-medium">Sell</span>
                        </div>
                        <span className="text-sm font-semibold">2%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-destructive h-2 rounded-full"
                          style={{ width: "2%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total Analysts
                      </span>
                      <span className="font-semibold">42</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Analyst Actions */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-4">
                Recent Analyst Actions
              </h4>
              <div className="space-y-3">
                {predictions?.analystInfo?.recentAnalystActions.map(
                  (action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {action.analystName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            action.action === "initiated"
                              ? "text-success"
                              : "text-warning"
                          }`}
                        >
                          {action.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Price Target: ${action.targetPrice}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Key Insights */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Key Insight</p>
              <p className="text-sm text-muted-foreground mt-1">
                Strong buy consensus driven by expected iPhone 16 super-cycle
                and growing services revenue. Most analysts see 10-20% upside
                potential over next 12 months.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
