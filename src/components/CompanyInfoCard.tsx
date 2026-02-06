import React from "react";
import {
  Building2,
  Calendar,
  User,
  TrendingUp,
  DollarSign,
  BarChart3,
  Activity,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyResponse } from "@/types/company";

interface CompanyInfoCardProps {
  selectedStock: CompanyResponse;
}

export const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({
  selectedStock,
}) => {
  return (
    <Card className="financial-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Industry */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="font-medium text-foreground">
                {selectedStock.companyInfo.industry}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedStock.companyInfo.customers}
              </p>
            </div>
          </div>

          {/* Founded */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Calendar className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Founded</p>
              <p className="font-medium text-foreground">
                {selectedStock.companyInfo.founded}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Old Company</p>
            </div>
          </div>

          {/* CEO */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <User className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CEO</p>
              <p className="font-medium text-foreground">
                {selectedStock.companyInfo.ceo}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Since 2011 -demo
              </p>
            </div>
          </div>

          {/* Market Cap */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-medium text-foreground">
                {selectedStock.companyInfo.marketCap}
              </p>
              <p className="text-xs text-success mt-1">+18% YTD</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* Revenue */}
          <div className="md:col-span-1 flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue (TTM)</p>
              <p className="font-medium text-foreground">$383.3B</p>
              <p className="text-xs text-success mt-1">+2.1% YoY</p>
            </div>
          </div>

          {/* P/E Ratio */}
          <div className="md:col-span-1 flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">P/E Ratio</p>
              <p className="font-medium text-foreground">
                {selectedStock.companyInfo.peRatio}
              </p>
              <p className="text-xs text-warning mt-1">Sector: 24.1</p>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-2 flex items-center space-x-3">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Products</p>
              <ul className="flex flex-wrap gap-2 list-none">
                {selectedStock?.companyInfo?.products?.map((product, index) => (
                  <li
                    key={index}
                    className="text-xs bg-muted px-2 py-0.5 rounded border border-border/50"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="space-y-3 mt-4">
          <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">
                Investment Highlights
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedStock.companyInfo.summary}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
