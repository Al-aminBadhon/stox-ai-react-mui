import React, { useState } from "react";
import {
  TrendingUp,
  Newspaper,
  BarChart3,
  Users,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Custom Hooks
import { useProfileFetch } from "@/hooks/useProfileFetch";
import { useStockSearch } from "@/hooks/useStockSearch";
import { useTabData } from "@/hooks/useTabData";

// Components
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { CompanyInfoCard } from "@/components/CompanyInfoCard";
import { NewsTab } from "@/components/NewsTab";
import { PredictionsTab } from "@/components/PredictionsTab";
import { InvestorsTab } from "@/components/InvestorsTab";
import { GuidelinesTab } from "@/components/GuidelinesTab";

/**
 * Home Component - Main stock analysis page
 *
 * This component has been refactored to follow best practices:
 * - Separated UI into smaller, reusable components
 * - Extracted data fetching logic into custom hooks
 * - Each tab content is now in its own component
 * - Reduced component complexity and improved maintainability
 */
const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Custom hooks for data management
  const { user } = useProfileFetch();
  const {
    searchTicker,
    setSearchTicker,
    selectedStock,
    setSelectedStock,
    searchLoading,
    handleSearch,
    handleStockSelect,
  } = useStockSearch();
  const { tabData, loadingTab, fetchTabData, resetTabData } = useTabData();

  // Local state
  const [activeTab, setActiveTab] = useState<string>("news");

  // Handle tab change and fetch data
  const handleTabChange = async (tab: string) => {
    if (!searchTicker.trim() || !selectedStock) return;

    setActiveTab(tab);
    await fetchTabData(tab, selectedStock.ticker);
  };

  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    localStorage.clear();
    navigate("/login");
  };

  // Handle search with form submission
  const handleSearchSubmit = async (e: React.FormEvent) => {
    await handleSearch(e);
    resetTabData();
    setActiveTab("news");
  };

  // Handle selecting from history and search
  const handleHistorySelect = async (ticker: string) => {
    setSearchTicker(ticker);
    // Trigger search with the selected ticker
    const event = new Event("submit") as any;
    event.preventDefault = () => {};
    event.target = { _reactInternalFiber: {} };

    setTimeout(async () => {
      await handleSearchSubmit(event);
    }, 0);
  };
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        searchTicker={searchTicker}
        onSearchTickerChange={setSearchTicker}
        onSearch={handleSearchSubmit}
        onHistorySelect={handleHistorySelect}
        searchLoading={searchLoading}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar
          selectedStock={selectedStock}
          userName={user?.name || null}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {!selectedStock ? (
            <div className="flex items-center justify-center h-full">
              <Card className="financial-card border-dashed border-2 border-border/50 bg-muted/20 max-w-md">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Agent is waiting for ticker name
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Feed me a ticker name to start the analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Company Info Card */}
              <CompanyInfoCard selectedStock={selectedStock} />

              {/* Analysis Tabs */}
              <Card className="financial-card">
                <CardContent className="p-0">
                  <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-full"
                  >
                    <div className="border-b border-border p-6 pb-0">
                      <TabsList className="grid w-full grid-cols-4 bg-muted/30">
                        <TabsTrigger
                          value="news"
                          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Newspaper className="w-4 h-4" />
                          Recent News
                        </TabsTrigger>
                        <TabsTrigger
                          value="predictions"
                          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <BarChart3 className="w-4 h-4" />
                          Analyst Predictions
                        </TabsTrigger>
                        <TabsTrigger
                          value="investors"
                          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Users className="w-4 h-4" />
                          Top Investors
                        </TabsTrigger>
                        <TabsTrigger
                          value="guidelines"
                          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          Investment Guidelines
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <TabsContent value="news" className="space-y-4 mt-0">
                        {selectedStock && (
                          <NewsTab selectedStock={selectedStock} />
                        )}
                      </TabsContent>

                      <TabsContent
                        value="predictions"
                        className="space-y-4 mt-0"
                      >
                        <PredictionsTab
                          predictions={tabData.predictions}
                          loading={loadingTab === "predictions"}
                        />
                      </TabsContent>

                      <TabsContent value="investors" className="space-y-4 mt-0">
                        <InvestorsTab selectedTicker={selectedStock.ticker} />
                      </TabsContent>

                      <TabsContent
                        value="guidelines"
                        className="space-y-4 mt-0"
                      >
                        <GuidelinesTab
                          guidelines={tabData.guidelines}
                          loading={loadingTab === "guidelines"}
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
