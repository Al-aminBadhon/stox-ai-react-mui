import React from "react";
import { TrendingUp, TrendingDown, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InvestorsTabProps {
  selectedTicker: string;
}

interface InstitutionalInvestor {
  name: string;
  type: "Hedge Fund" | "Pension Fund" | "Mutual Fund" | "ETF";
  shares: string;
  percentage: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
}

const topInvestors: InstitutionalInvestor[] = [
  {
    name: "Berkshire Hathaway",
    type: "Hedge Fund",
    shares: "915.6M",
    percentage: "5.3%",
    value: "$144.2B",
    change: "+2.3%",
    changeDirection: "up",
  },
  {
    name: "Vanguard Group",
    type: "Mutual Fund",
    shares: "762.4M",
    percentage: "4.4%",
    value: "$120.1B",
    change: "+1.8%",
    changeDirection: "up",
  },
  {
    name: "BlackRock",
    type: "ETF",
    shares: "678.9M",
    percentage: "3.9%",
    value: "$107.0B",
    change: "+0.9%",
    changeDirection: "up",
  },
  {
    name: "Fidelity Investments",
    type: "Mutual Fund",
    shares: "523.2M",
    percentage: "3.0%",
    value: "$82.5B",
    change: "-0.4%",
    changeDirection: "down",
  },
  {
    name: "State Street Global Advisors",
    type: "ETF",
    shares: "456.1M",
    percentage: "2.6%",
    value: "$71.9B",
    change: "+0.6%",
    changeDirection: "up",
  },
  {
    name: "Capitol Research",
    type: "Mutual Fund",
    shares: "389.8M",
    percentage: "2.2%",
    value: "$61.5B",
    change: "+1.2%",
    changeDirection: "up",
  },
];

interface PensionFarm {
  name: string;
  holdingValue: string;
  shares: string;
  changeThisQuarter: string;
  direction: "up" | "down";
}

const pensionFunds: PensionFarm[] = [
  {
    name: "CalPERS",
    holdingValue: "$45.2B",
    shares: "285.5M",
    changeThisQuarter: "+3.2%",
    direction: "up",
  },
  {
    name: "CalSTRS",
    holdingValue: "$32.8B",
    shares: "207.2M",
    changeThisQuarter: "+1.9%",
    direction: "up",
  },
  {
    name: "Teacher Retirement System",
    holdingValue: "$28.5B",
    shares: "180.1M",
    changeThisQuarter: "-0.7%",
    direction: "down",
  },
  {
    name: "New York State Common",
    holdingValue: "$22.1B",
    shares: "139.8M",
    changeThisQuarter: "+2.1%",
    direction: "up",
  },
];

export const InvestorsTab: React.FC<InvestorsTabProps> = ({
  selectedTicker,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Institutional Holdings & Activity
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Top institutional investors and their recent trading activity in{" "}
            {selectedTicker}
          </p>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-background/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">78.3%</div>
            <div className="text-sm text-muted-foreground">
              Institutional Ownership
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">14</div>
            <div className="text-sm text-muted-foreground">Recent Buyers</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive mb-1">6</div>
            <div className="text-sm text-muted-foreground">Recent Sellers</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">$2.1T</div>
            <div className="text-sm text-muted-foreground">Total Held</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Institutional Investors */}
      <Card className="financial-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-foreground">
              Top Institutional Investors
            </h4>
            <div className="text-sm text-muted-foreground">Largest holders</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Investor
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                    Shares
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                    Ownership
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                    Value
                  </th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {topInvestors.map((investor, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">
                          {investor.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {investor.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-foreground">
                      {investor.shares}
                    </td>
                    <td className="py-3 px-2 text-right text-foreground">
                      {investor.percentage}
                    </td>
                    <td className="py-3 px-2 text-right text-foreground">
                      {investor.value}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div
                        className={`flex items-center justify-end space-x-1 ${
                          investor.changeDirection === "up"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {investor.changeDirection === "up" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{investor.change}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pension Funds Sector */}
      <Card className="financial-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-foreground">
              Pension Funds & Retirement Plans
            </h4>
            <div className="text-sm text-muted-foreground">
              Long-term institutional investors
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pensionFunds.map((fund, idx) => (
              <div
                key={idx}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{fund.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pension/Retirement Fund
                    </p>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm font-semibold ${
                      fund.direction === "up"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {fund.direction === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{fund.changeThisQuarter}</span>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Holding Value
                    </p>
                    <p className="font-semibold text-foreground">
                      {fund.holdingValue}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Shares</p>
                    <p className="font-semibold text-foreground">
                      {fund.shares}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card className="financial-card bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-3">
            Recent Institutional Activity
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Latest filing period: Q4 2025
              </span>
              <span className="font-medium text-foreground">
                20 institutions reported changes
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Net flows this quarter
              </span>
              <span className="flex items-center space-x-1 text-success font-medium">
                <TrendingUp className="w-4 h-4" />
                +$12.3B inflow
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
