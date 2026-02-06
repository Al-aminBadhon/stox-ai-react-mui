import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GuidelineInfoResponse } from "@/types/guidelineInfo";

interface GuidelinesTabProps {
  guidelines: GuidelineInfoResponse | null;
  loading: boolean;
}

export const GuidelinesTab: React.FC<GuidelinesTabProps> = ({
  guidelines,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-muted-foreground">
            Loading investment guidelines...
          </p>
        </div>
      </div>
    );
  }

  if (!guidelines) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-muted-foreground">
          No investment guidelines available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Investment Guidelines & Best Practices
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Strategic recommendations for this investment
          </p>
        </div>
      </div>

      {/* Guidelines Content */}
      {guidelines && guidelines.report ? (
        <Card className="financial-card">
          <CardContent className="p-6">
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {guidelines.report}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="financial-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Investment guidelines content pending...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
