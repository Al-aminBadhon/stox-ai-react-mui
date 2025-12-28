import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import {
  Search,
  Clock,
  TrendingUp,
  Building2,
  Calendar,
  User,
  LogOut,
  Newspaper,
  BarChart3,
  BookOpen,
  ChevronRight,
  TrendingDown,
  PieChart,
  Users,
  Briefcase,
  Brain,
  Info,
  Minus,
  Target,
  ArrowUp,
  DollarSign,
  MapPin,
  Percent,
  Activity,
  Gauge,
  Leaf,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Lightbulb,
  Download,
  ExternalLink,
  AlertTriangle,
  Crown,
  Plus,
  Banknote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { CompanyResponse } from "@/types/company";
import { AnalystPredictions } from "@/types/analystInfo";
import { GuidelineInfoResponse } from "@/types/guidelineInfo";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTicker, setSearchTicker] = useState("");
  const [selectedStock, setSelectedStock] = useState<CompanyResponse | null>(
    null
  );
  const [companyInfo, setCompanyInfo] = useState<any>(null);

  const [news, setNews] = useState<any>(null);
  const [predictions, setPredictions] = useState<AnalystPredictions | null>(
    null
  );
  // const [investors, setInvestors] = useState<any>(null);
  const [guidelines, setGuidelines] = useState<GuidelineInfoResponse | null>(
    null
  );

  const [activeTab, setActiveTab] = useState<string>("news");
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  console.log("Active Tab:", activeTab);
  const [searchHistory] = useState([
    { ticker: "AAPL", timestamp: "2 hours ago", name: "Apple Inc." },
    { ticker: "GOOGL", timestamp: "1 day ago", name: "Alphabet Inc." },
    { ticker: "MSFT", timestamp: "2 days ago", name: "Microsoft Corp." },
    { ticker: "TSLA", timestamp: "3 days ago", name: "Tesla Inc." },
    { ticker: "AMZN", timestamp: "1 week ago", name: "Amazon.com Inc." },
  ]);
  // const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<{
    email: string;
    name: string;
    mobile: string;
    isVerified: number;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        const user = res.data.user;

        if (user.isVerified === 0) {
          navigate("/login");
        }

        setUser(user); // data from backend
      } catch (error) {
        console.error("Profile fetch failed", error);
        localStorage.clear();
        navigate("/login");
      } finally {
      }
    };

    fetchProfile();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicker.trim()) return;

    try {
      if (
        searchTicker.trim().toUpperCase() ===
        selectedStock?.ticker.toUpperCase()
      )
        return toast({
          title: "Stock Analysis already loaded",
          description: `Loaded data for ${searchTicker.toUpperCase()}`,
        });
      const res = await api.get<CompanyResponse>(
        `research/${searchTicker.toUpperCase()}`
      );
      // initialSearchData = res.data;
      setSelectedStock(res.data);
      console.log("Predictions Data:", predictions);

      setPredictions(null);
      setGuidelines(null);
      setActiveTab("news");
    } catch (err) {
      console.error("Search failed", err);
      localStorage.clear();
      navigate("/login");
    } finally {
    }
    toast({
      title: "Stock Analysis Complete",
      description: `Loaded data for ${searchTicker.toUpperCase()}`,
    });
  };

  const handleTabChange = async (tab: string) => {
    if (!searchTicker.trim()) return;

    setActiveTab(tab);
    console.log("before checking if tab ", guidelines?.report);
    if (
      (tab === "news" && news) ||
      (tab === "predictions" && predictions) ||
      (tab === "guidelines" && guidelines)

      // || tab === "investors" && investors
    ) {
      console.log("Predictions Data:", predictions);
      return;
    }
    try {
      setLoadingTab(tab);
      if (tab === "predictions") {
        const res = await api.get<AnalystPredictions>(
          `/research/analyst/${searchTicker.toUpperCase()}`
        );
        setPredictions(res.data);
        console.log("Predictions Data:", predictions);
        console.log("response Data:", res.data);
      }
      if (tab === "investors") {
        // api.get<InvestorInfo>(`/research/investors/${searchTicker.toUpperCase()}`).then((res) => {
        //   setInvestors(res.data);
        // });
      }
      if (tab === "guidelines") {
        console.log("Guideline api hitting");
        const res = await api.get(
          `/research/guideline/${searchTicker.toUpperCase()}`
        );
        setTimeout(() => {
          setGuidelines(res.data.guideLineInfo);
        }, 3000);
      }
    } catch (error) {
      console.log("Tab dat fetch error:", error);
    } finally {
      setLoadingTab(null);
    }
  };
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    localStorage.clear();
    navigate("/login");
  };
  const downloadPdf = async () => {
    const response = await fetch("/download-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ reportData: reportData }), // Pass report data string
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Research Report {{selectedStock?.ticker}}.pdf";
    a.click();
  };
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-card border-r border-border shadow-lg flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <Logo size="md" />
        </div>

        {/* Search Section */}
        <div className="p-6 border-b border-border">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter ticker (e.g., AAPL)"
                value={searchTicker}
                onChange={(e) => setSearchTicker(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-10 bg-gradient-primary hover:opacity-90 font-medium"
            >
              <Search className="w-4 h-4 mr-2" />
              Analyze Stock
            </Button>
          </form>
        </div>

        {/* Search History */}
        <div className="flex-1 p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            Recent Searches
          </h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTicker(item.ticker);
                    handleSearch(new Event("submit") as any);
                  }}
                  className="w-full p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-smooth text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-foreground group-hover:text-primary">
                        {item.ticker}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-card border-b border-border shadow-sm flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {selectedStock ? (
              <>
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm font-semibold bg-primary/10 text-primary border-primary/20"
                >
                  {selectedStock.ticker}
                </Badge>
                <h1 className="text-xl font-semibold text-foreground">
                  {selectedStock.companyInfo.name}
                </h1>
              </>
            ) : (
              <h1 className="text-xl font-semibold text-muted-foreground">
                Select a stock to analyze
              </h1>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                    {user?.name ? "BD" : "GT"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-popover border-border shadow-lg"
              align="end"
            >
              <DropdownMenuItem className="hover:bg-muted/50 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-muted/50 cursor-pointer text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
              {/* Company Info */}
              <Card className="financial-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Industry */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Industry
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedStock.companyInfo.industry}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedStock.companyInfo.customers}
                        </p>
                      </div>
                    </div>

                    {/* Founded content*/}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                        <p className="font-medium text-foreground">
                          {selectedStock.companyInfo.founded}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Old Company
                        </p>
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
                        <p className="text-sm text-muted-foreground">
                          Market Cap
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedStock.companyInfo.marketCap}
                        </p>
                        <p className="text-xs text-success mt-1">+18% YTD</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* 1. Revenue - Takes 1/4 of total width (First half of the half) */}
                    <div className="md:col-span-1 flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Revenue (TTM)
                        </p>
                        <p className="font-medium text-foreground">$383.3B</p>
                        <p className="text-xs text-success mt-1">+2.1% YoY</p>
                      </div>
                    </div>

                    {/* 2. P/E Ratio - Takes 1/4 of total width (Second half of the half) */}
                    <div className="md:col-span-1 flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          P/E Ratio
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedStock.companyInfo.peRatio}
                        </p>
                        <p className="text-xs text-warning mt-1">
                          Sector: 24.1
                        </p>
                      </div>
                    </div>

                    {/* 3. Products/52W Range - Takes 2/4 (the entire remaining half) */}
                    <div className="md:col-span-2 flex items-center space-x-3">
                      <div className="p-2 bg-rose-500/10 rounded-lg">
                        <Activity className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Products
                        </p>
                        {/* flex wrapper to display dynamic products horizontally or neatly */}
                        <ul className="flex flex-wrap gap-2 list-none">
                          {selectedStock?.companyInfo?.products?.map(
                            (product, index) => (
                              <li
                                key={index}
                                className="text-xs bg-muted px-2 py-0.5 rounded border border-border/50"
                              >
                                {product}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="space-y-3 mt-4">
                    {/* <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStock.description}
                    </p> */}
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
                        {/* Market Sentiment Summary */}
                        <Card className="financial-card border-0">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-md font-semibold text-foreground">
                                Market Sentiment Summary
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Activity className="w-4 h-4" />
                                <span>
                                  Last updated:{" "}
                                  {new Date().toLocaleTimeString()}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
                                <div className="text-2xl font-bold text-success">
                                  {
                                    selectedStock.news.sentimentAnalysis
                                      .bullishOutOf100
                                  }
                                  %
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Bullish
                                </div>
                              </div>
                              <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
                                <div className="text-2xl font-bold text-warning">
                                  {
                                    selectedStock.news.sentimentAnalysis
                                      .neutralOutOf100
                                  }
                                  %
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Neutral
                                </div>
                              </div>
                              <div className="text-center p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                                <div className="text-2xl font-bold text-destructive">
                                  {
                                    selectedStock.news.sentimentAnalysis
                                      .bearishOutOf100
                                  }
                                  %
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Bearish
                                </div>
                              </div>
                              <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="text-2xl font-bold text-primary">
                                  {
                                    selectedStock.news.sentimentAnalysis
                                      .sentimentScoreOutOf5
                                  }
                                  /5
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Sentiment Score
                                </div>
                              </div>
                            </div>

                            {/* <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-success" />
                                <span className="text-foreground">
                                  Positive Drivers:
                                </span>
                                <span className="text-muted-foreground">
                                  Strong earnings, iPhone demand
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-warning" />
                                <span className="text-foreground">Watch:</span>
                                <span className="text-muted-foreground">
                                  China regulations, supply chain, tariff news
                                </span>
                              </div>
                            </div> */}
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Latest Market News & Analysis
                        </h3>

                        {selectedStock.news.recentNews.map(
                          (newsItem, index) => (
                            <div
                              className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                              onClick={() =>
                                window.open(`${newsItem.url}`, "_blank")
                              }
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
                          )
                        )}
                      </TabsContent>

                      <TabsContent
                        value="predictions"
                        className="space-y-4 mt-0"
                      >
                        {loadingTab === "predictions" ? (
                          <div className="flex items-center justify-center h-48">
                            <div className="text-center space-y-3">
                              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                              <p className="text-sm text-muted-foreground">
                                Loading predictions...
                              </p>
                            </div>
                          </div>
                        ) : !predictions ? (
                          <div className="flex items-center justify-center h-48">
                            <p className="text-sm text-muted-foreground">
                              No predictions available
                            </p>
                          </div>
                        ) : (
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
                                            $
                                            {
                                              predictions?.analystInfo
                                                ?.avgTargetPrice
                                            }
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
                                            {
                                              predictions?.analystInfo
                                                ?.upsidePotential
                                            }
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
                                            {
                                              predictions?.analystInfo
                                                ?.currentPrice
                                            }
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
                                  {/* market sentiment */}
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
                                              <span className="text-sm font-medium">
                                                Bullish
                                              </span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                              72%
                                            </span>
                                          </div>

                                          <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                                            <div className="flex items-center space-x-2">
                                              <Minus className="w-4 h-4 text-warning" />
                                              <span className="text-sm font-medium">
                                                Neutral
                                              </span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                              18%
                                            </span>
                                          </div>

                                          <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                                            <div className="flex items-center space-x-2">
                                              <TrendingDown className="w-4 h-4 text-destructive" />
                                              <span className="text-sm font-medium">
                                                Bearish
                                              </span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                              10%
                                            </span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  {/* Left: Price Target Range */}
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
                                              {
                                                predictions?.analystInfo
                                                  ?.lowestTargetPrice
                                              }
                                            </span>
                                          </div>

                                          <div className="relative pt-2">
                                            <div className="w-full bg-muted rounded-full h-2">
                                              <div className="bg-gradient-to-r from-destructive via-warning to-success h-2 rounded-full"></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                              <span>$150</span>
                                              <span className="text-foreground font-medium">
                                                Current:{" "}
                                                {
                                                  predictions?.analystInfo
                                                    ?.currentPrice
                                                }
                                              </span>
                                              <span>$210</span>
                                            </div>
                                          </div>

                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">
                                              High Target
                                            </span>
                                            <span className="text-sm font-medium text-success">
                                              {
                                                predictions?.analystInfo
                                                  ?.highestTargetPrice
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>

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
                                                <div className="w-3 h-3 bg-success rounded-full"></div>
                                                <span className="text-sm font-medium">
                                                  Strong Buy
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                {
                                                  predictions?.analystInfo
                                                    ?.analystRecommendationBreakdown
                                                    ?.strongBuyOutOf100
                                                }
                                                %
                                              </span>
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
                                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                                                <span className="text-sm font-medium">
                                                  Buy
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                {
                                                  predictions?.analystInfo
                                                    ?.analystRecommendationBreakdown
                                                    ?.buyOutOf100
                                                }
                                                %
                                              </span>
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
                                                <div className="w-3 h-3 bg-warning rounded-full"></div>
                                                <span className="text-sm font-medium">
                                                  Hold
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                {
                                                  predictions?.analystInfo
                                                    ?.analystRecommendationBreakdown
                                                    ?.holdOutOf100
                                                }
                                                %
                                              </span>
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
                                                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                                                <span className="text-sm font-medium">
                                                  Sell
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                {
                                                  predictions?.analystInfo
                                                    ?.analystRecommendationBreakdown
                                                    ?.sellOutOf100
                                                }
                                                %
                                              </span>
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
                                            <span className="font-semibold">
                                              {
                                                predictions?.analystInfo
                                                  ?.analystRecommendationBreakdown
                                                  ?.totalAnalysts
                                              }
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between text-sm mt-2">
                                            <span className="text-muted-foreground">
                                              Bullish Consensus
                                            </span>
                                            <span className="font-semibold text-success">
                                              90%
                                            </span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  <div className="lg:col-span-2">
                                    {/* Recent Analyst Actions */}
                                    <div>
                                      <h4 className="font-semibold text-foreground mb-4">
                                        Recent Analyst Actions
                                      </h4>
                                      <div className="space-y-3">
                                        {predictions?.analystInfo?.recentAnalystActions.map(
                                          (action) => (
                                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                              <div>
                                                <p className="font-medium text-foreground">
                                                  {action.analystName}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                  {action.action} • Target $
                                                  {action.targetPrice}
                                                </p>
                                              </div>
                                              <div className="text-right">
                                                <p className="text-sm font-medium text-success">
                                                  +5.2% upside
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                  {action.date}
                                                </p>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Market Sentiment - spans 1 column (same width as recommendations) */}
                                </div>
                              </div>

                              <Separator className="my-6" />

                              {/* Key Insights */}
                              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="flex items-start space-x-3">
                                  <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Key Insight
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Strong buy consensus driven by expected
                                      iPhone 16 super-cycle and growing services
                                      revenue. Most analysts see 10-20% upside
                                      potential over next 12 months.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="investors" className="space-y-4 mt-0">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              Institutional Holdings & Activity
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Top 20 institutional investors and their recent
                              trading activity in Apple
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Latest data: {new Date().toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Quick Stats Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <Card className="border-border/50 bg-background/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-foreground mb-1">
                                78.3%
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Institutional Ownership
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50 bg-background/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-success mb-1">
                                14
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Recent Buyers
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50 bg-background/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-destructive mb-1">
                                6
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Recent Sellers
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50 bg-background/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-primary mb-1">
                                $420B
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Total Held
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Top Investors Table */}
                        <Card className="financial-card">
                          <CardContent className="p-0">
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-border/50">
                                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                      Investor
                                    </th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                                      Shares Held
                                    </th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                                      Value
                                    </th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                                      % Change
                                    </th>
                                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                                      Recent Activity
                                    </th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                                      Portfolio %
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                  {/* 1. Vanguard Group */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                          <Building2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            Vanguard Group
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Largest shareholder
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      1.28B
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $207.4B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-success">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="font-medium">
                                          +2.1%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                                        <Plus className="w-3 h-3" />
                                        <span>Added 26.5M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      7.8%
                                    </td>
                                  </tr>

                                  {/* 2. BlackRock */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                          <PieChart className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            BlackRock
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Second largest
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      1.01B
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $163.6B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-success">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="font-medium">
                                          +1.4%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                                        <Plus className="w-3 h-3" />
                                        <span>Added 14.2M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      6.1%
                                    </td>
                                  </tr>

                                  {/* 3. State Street Corp */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                          <Users className="w-4 h-4 text-green-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            State Street Corp
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Major institutional
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      678.2M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $109.9B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-warning">
                                        <Minus className="w-3 h-3" />
                                        <span className="font-medium">
                                          0.0%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                                        <Minus className="w-3 h-3" />
                                        <span>No change</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      4.1%
                                    </td>
                                  </tr>

                                  {/* 4. Berkshire Hathaway (Warren Buffett) */}
                                  <tr className="hover:bg-muted/20 transition-colors bg-amber-50/30">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                          <Crown className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            Berkshire Hathaway
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Warren Buffett • Long-term holder
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      915.6M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $148.3B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-destructive">
                                        <TrendingDown className="w-3 h-3" />
                                        <span className="font-medium">
                                          -0.3%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                                        <Minus className="w-3 h-3" />
                                        <span>Reduced 2.8M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      45.2%
                                    </td>
                                  </tr>

                                  {/* 5. Fidelity Investments */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                          <Briefcase className="w-4 h-4 text-purple-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            Fidelity Investments
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Active management
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      245.3M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $39.7B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-destructive">
                                        <TrendingDown className="w-3 h-3" />
                                        <span className="font-medium">
                                          -0.7%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                                        <Minus className="w-3 h-3" />
                                        <span>Sold 1.7M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      3.2%
                                    </td>
                                  </tr>

                                  {/* 6. T. Rowe Price */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                                          <TrendingUp className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            T. Rowe Price
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Growth focus
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      189.4M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $30.7B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-success">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="font-medium">
                                          +3.2%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                                        <Plus className="w-3 h-3" />
                                        <span>Added 5.9M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      8.1%
                                    </td>
                                  </tr>

                                  {/* Continue with more investors... */}
                                  {/* 7. Morgan Stanley */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                                          <Banknote className="w-4 h-4 text-cyan-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            Morgan Stanley
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Investment banking
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      156.8M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $25.4B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-success">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="font-medium">
                                          +1.8%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                                        <Plus className="w-3 h-3" />
                                        <span>Added 2.8M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      4.5%
                                    </td>
                                  </tr>

                                  {/* 8. Goldman Sachs */}
                                  <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                                          <DollarSign className="w-4 h-4 text-yellow-500" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-foreground">
                                            Goldman Sachs
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Prime brokerage
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                      142.3M
                                    </td>
                                    <td className="p-4 text-right font-semibold">
                                      $23.1B
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end space-x-1 text-destructive">
                                        <TrendingDown className="w-3 h-3" />
                                        <span className="font-medium">
                                          -2.1%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="inline-flex items-center space-x-1 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                                        <Minus className="w-3 h-3" />
                                        <span>Sold 3.1M shares</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right text-muted-foreground">
                                      3.8%
                                    </td>
                                  </tr>

                                  {/* Additional investors 9-20 would continue here... */}
                                </tbody>
                              </table>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Recent Major Transactions */}
                        <Card className="financial-card">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="font-semibold text-foreground">
                                Recent Major Transactions
                              </h4>
                              <div className="text-sm text-muted-foreground">
                                Last 30 days
                              </div>
                            </div>

                            <div className="space-y-4">
                              {/* Berkshire Hathaway Transaction */}
                              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="flex items-center space-x-4">
                                  <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Crown className="w-5 h-5 text-amber-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Berkshire Hathaway
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Reduced position by 2.8M shares
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Filed: 13F-HR • December 15, 2024
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-destructive">
                                    -$450M
                                  </p>
                                  <div className="flex items-center space-x-1 text-sm text-destructive">
                                    <TrendingDown className="w-3 h-3" />
                                    <span>Partial profit-taking</span>
                                  </div>
                                </div>
                              </div>

                              {/* Vanguard Transaction */}
                              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="flex items-center space-x-4">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Building2 className="w-5 h-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Vanguard Group
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Increased position by 26.5M shares
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Filed: 13F-HR • December 18, 2024
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-success">
                                    +$4.2B
                                  </p>
                                  <div className="flex items-center space-x-1 text-sm text-success">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Strategic accumulation</span>
                                  </div>
                                </div>
                              </div>

                              {/* T. Rowe Price Transaction */}
                              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="flex items-center space-x-4">
                                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      T. Rowe Price
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Added 5.9M shares to growth funds
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Filed: 13F-HR • December 20, 2024
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-success">
                                    +$955M
                                  </p>
                                  <div className="flex items-center space-x-1 text-sm text-success">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Growth conviction</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Ownership Distribution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="financial-card">
                            <CardContent className="p-6">
                              <h4 className="font-semibold text-foreground mb-4">
                                Ownership Distribution
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Institutional
                                  </span>
                                  <span className="font-medium">78.3%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: "78.3%" }}
                                  ></div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Insider
                                  </span>
                                  <span className="font-medium">0.1%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: "0.1%" }}
                                  ></div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Retail
                                  </span>
                                  <span className="font-medium">21.6%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: "21.6%" }}
                                  ></div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="financial-card">
                            <CardContent className="p-6">
                              <h4 className="font-semibold text-foreground mb-4">
                                Recent Activity Summary
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <span className="text-sm">
                                      Institutions Buying
                                    </span>
                                  </div>
                                  <span className="font-medium text-success">
                                    14 firms
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                                    <span className="text-sm">
                                      Institutions Selling
                                    </span>
                                  </div>
                                  <span className="font-medium text-destructive">
                                    6 firms
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                                    <span className="text-sm">No Change</span>
                                  </div>
                                  <span className="font-medium text-warning">
                                    8 firms
                                  </span>
                                </div>
                                <div className="pt-2 border-t border-border/50">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Net Institutional Flow
                                    </span>
                                    <span className="font-medium text-success">
                                      +$3.8B
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent
                        value="guidelines"
                        className="space-y-4 mt-0"
                      >
                        <TabsContent
                          value="guidelines"
                          className="space-y-4 mt-0"
                        >
                          {!guidelines?.report ? (
                            <Card className="financial-card">
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                  <h3 className="text-lg font-semibold text-foreground">
                                    AI Investment Insights
                                  </h3>
                                  <div className="flex items-center space-x-2 text-sm text-primary">
                                    <Brain className="w-4 h-4" />
                                    <span>AI Analysis in Progress</span>
                                  </div>
                                </div>
                                {/* Download Button - Added at the top */}
                                <div className="flex justify-end mb-6">
                                  <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 text-primary hover:from-primary/20 hover:to-blue-500/20 hover:border-primary/30 transition-all duration-300 group"
                                    disabled
                                  >
                                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Download Full Analysis Report
                                    <span className="ml-2 px-2 py-1 text-xs bg-primary/20 rounded-full">
                                      Soon
                                    </span>
                                  </Button>
                                </div>

                                {/* Loading Animation */}
                                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                  {/* Animated AI Icon */}
                                  <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                                      <Brain className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse"></div>
                                  </div>

                                  {/* Progress Indicator */}
                                  <div className="w-full max-w-md space-y-4">
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                      <span>Analysis Progress</span>
                                      <span className="text-primary font-medium">
                                        Initializing...
                                      </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div
                                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: "25%" }}
                                      ></div>
                                    </div>
                                  </div>

                                  {/* Status Messages */}
                                  <div className="text-center space-y-3">
                                    <h4 className="font-semibold text-foreground">
                                      Deep Analysis in Progress
                                    </h4>
                                    <p className="text-muted-foreground max-w-md leading-relaxed">
                                      Our AI agents are conducting comprehensive
                                      analysis of Apple's industry position,
                                      market trends, and competitive landscape
                                      across multiple data sources.
                                    </p>
                                  </div>

                                  {/* Estimated Time */}
                                  <div className="flex items-center space-x-3 p-4 bg-warning/5 rounded-lg border border-warning/20">
                                    <Clock className="w-5 h-5 text-warning" />
                                    <div>
                                      <p className="font-medium text-foreground">
                                        Estimated time remaining: ~30 seconds
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Processing real-time market data and
                                        industry insights
                                      </p>
                                    </div>
                                  </div>

                                  {/* Analysis Steps */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                                    <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
                                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                      <span className="text-sm text-foreground">
                                        Market Analysis
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
                                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                      <span className="text-sm text-foreground">
                                        Competitor Research
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                      <span className="text-sm text-foreground">
                                        Financial Modeling
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                      <span className="text-sm text-foreground">
                                        Risk Assessment
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Note */}
                                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                                  <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Why does this take time?
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Our AI analyzes thousands of data points
                                      including market trends, financial
                                      reports, news sentiment, and technical
                                      indicators to provide comprehensive
                                      investment insights.
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="financial-card">
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                  <h3 className="text-lg font-semibold text-foreground">
                                    AI Investment Insights
                                  </h3>
                                </div>
                                {/* Download Button - Added at the top */}
                                <div className="flex justify-end mb-6">
                                  <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 text-primary hover:from-primary/20 hover:to-blue-500/20 hover:border-primary/30 transition-all duration-300 group"
                                  >
                                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Download Report
                                  </Button>
                                </div>

                                {/* Note */}
                                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                                  <Info className="w-10 h-7 text-red-900-foreground mt-0" />
                                  <div>
                                    <p className="font-medium text-warning mb-6">
                                      This is AI analysis based on current
                                      market, always make your own decissions.
                                    </p>
                                    <p className="text-sm text-foreground mt-1">
                                      <ReactMarkdown
                                        components={{
                                          // Use fragments around {children} to satisfy TypeScript
                                          p: ({ node, children, ...props }) => (
                                            <p
                                              className="text-justify leading-relaxed mb-4"
                                              {...props}
                                            >
                                              <>{children}</>
                                            </p>
                                          ),
                                          strong: ({
                                            node,
                                            children,
                                            ...props
                                          }) => (
                                            <strong
                                              className="block font-bold text-black-900 mt-3 mb-0"
                                              {...props}
                                            >
                                              <>{children}</>
                                            </strong>
                                          ),
                                          li: ({
                                            node,
                                            children,
                                            ...props
                                          }) => (
                                            <li
                                              className="text-justify mb-2 ml-4 list-disc"
                                              {...props}
                                            >
                                              <>{children}</>
                                            </li>
                                          ),
                                        }}
                                      >
                                        {guidelines?.report}
                                      </ReactMarkdown>
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </TabsContent>
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
