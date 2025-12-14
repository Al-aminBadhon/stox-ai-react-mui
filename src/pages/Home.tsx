import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { parse } from "path";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTicker, setSearchTicker] = useState("");
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [searchHistory] = useState([
    { ticker: "AAPL", timestamp: "2 hours ago", name: "Apple Inc." },
    { ticker: "GOOGL", timestamp: "1 day ago", name: "Alphabet Inc." },
    { ticker: "MSFT", timestamp: "2 days ago", name: "Microsoft Corp." },
    { ticker: "TSLA", timestamp: "3 days ago", name: "Tesla Inc." },
    { ticker: "AMZN", timestamp: "1 week ago", name: "Amazon.com Inc." },
  ]);
  const storedUser = localStorage.getItem("user");

  console.log("data stored", localStorage.getItem("user"));
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicker.trim()) return;

    // Mock stock data
    const mockData = {
      ticker: searchTicker.toUpperCase(),
      name: "Apple Inc.",
      industry: "Technology Hardware",
      founded: "1976",
      ceo: "Tim Cook",
      description:
        "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",

      // Additional enhanced data
      marketCap: "4T",
      revenue: "383.3B",
      employees: "164,000",
      headquarters: "Cupertino, CA",
      dividendYield: "0.55%",
      peRatio: "28.5",
      weekRange: "132 - 199",
      beta: "1.28",
      esgScore: "A-",

      businessSegments: [
        { name: "iPhone", revenueShare: "52%", icon: "Smartphone" },
        { name: "Services", revenueShare: "25%", icon: "Laptop" },
        { name: "Mac & iPad", revenueShare: "15%", icon: "Tablet" },
        { name: "Wearables", revenueShare: "8%", icon: "Watch" },
      ],

      performance: {
        ytdReturn: "+18%",
        revenueGrowth: "+2.1%",
        ceoTenure: "Since 2011",
        companyAge: "48 years",
      },
    };

    setSelectedStock(mockData);
    toast({
      title: "Stock Analysis Complete",
      description: `Loaded data for ${searchTicker.toUpperCase()}`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
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
                  {selectedStock.name}
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
                    {user.name ? "BD" : "GT"}
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
                          {selectedStock.industry}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Consumer Electronics
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
                          {selectedStock.founded}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          48 years ago
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
                          {selectedStock.ceo}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Since 2011
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
                        <p className="font-medium text-foreground">$2.8T</p>
                        <p className="text-xs text-success mt-1">+18% YTD</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Second Row - Additional Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Revenue */}
                    <div className="flex items-center space-x-3">
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
                    {/* P/E Ratio */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          P/E Ratio
                        </p>
                        <p className="font-medium text-foreground">28.5</p>
                        <p className="text-xs text-warning mt-1">
                          Sector: 24.1
                        </p>
                      </div>
                    </div>

                    {/* 52 Week Range */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-rose-500/10 rounded-lg">
                        <Activity className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          52W Range
                        </p>
                        <p className="font-medium text-foreground">
                          $132 - $199
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          +23% from low
                        </p>
                      </div>
                    </div>

                    {/* Employees */}
                    {/* <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Users className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Employees
                        </p>
                        <p className="font-medium text-foreground">164,000</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Global workforce
                        </p>
                      </div>
                    </div> */}

                    {/* Headquarters */}
                    {/* <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Headquarters
                        </p>
                        <p className="font-medium text-foreground">
                          Cupertino, CA
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          United States
                        </p>
                      </div>
                    </div> */}

                    {/* Dividend Yield */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-500/10 rounded-lg">
                        <Percent className="w-5 h-5 text-teal-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Dividend Yield
                        </p>
                        <p className="font-medium text-foreground">0.55%</p>
                        <p className="text-xs text-success mt-1">
                          $0.96 per share
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Third Row - Key Performance Indicators */}
                  {/*<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Beta */}
                  {/* <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Gauge className="w-5 h-5 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Beta</p>
                        <p className="font-medium text-foreground">1.28</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          More volatile
                        </p>
                      </div>
                    </div> */}

                  {/* ESG Score */}
                  {/* <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Leaf className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          ESG Score
                        </p>
                        <p className="font-medium text-foreground">A-</p>
                        <p className="text-xs text-success mt-1">
                          Industry leader
                        </p>
                      </div>
                    </div> 
                  </div>*/}

                  <Separator className="my-4" />

                  {/* Business Segments */}
                  {/* <div className="mt-4">
                    <h4 className="font-semibold text-foreground mb-3">
                      Business Segments
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg text-center">
                        <Smartphone className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-xs font-medium">iPhone</span>
                        <span className="text-xs text-muted-foreground">
                          52%
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg text-center">
                        <Laptop className="w-4 h-4 text-green-500 mb-1" />
                        <span className="text-xs font-medium">Services</span>
                        <span className="text-xs text-muted-foreground">
                          25%
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg text-center">
                        <Tablet className="w-4 h-4 text-purple-500 mb-1" />
                        <span className="text-xs font-medium">Mac & iPad</span>
                        <span className="text-xs text-muted-foreground">
                          15%
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg text-center">
                        <Watch className="w-4 h-4 text-orange-500 mb-1" />
                        <span className="text-xs font-medium">Wearables</span>
                        <span className="text-xs text-muted-foreground">
                          8%
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* <Separator className="my-4" /> */}

                  {/* Enhanced Description */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStock.description}
                    </p>
                    <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Investment Highlights
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Apple maintains strong brand loyalty, ecosystem
                          lock-in, and growing services revenue. The company
                          continues to innovate in AR/VR and has significant
                          cash reserves for strategic investments.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <Card className="financial-card">
                <CardContent className="p-0">
                  <Tabs defaultValue="news" className="w-full">
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
                              <h3 className="text-lg font-semibold text-foreground">
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
                                  72%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Bullish
                                </div>
                              </div>
                              <div className="text-center p-3 bg-warning/5 rounded-lg border border-warning/20">
                                <div className="text-2xl font-bold text-warning">
                                  18%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Neutral
                                </div>
                              </div>
                              <div className="text-center p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                                <div className="text-2xl font-bold text-destructive">
                                  10%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Bearish
                                </div>
                              </div>
                              <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="text-2xl font-bold text-primary">
                                  4.2/5
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Sentiment Score
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
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
                            </div>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Latest Market News & Analysis
                        </h3>

                        <div className="space-y-4">
                          {/* Breaking News */}
                          <div
                            className="p-4 border-2 border-warning/30 rounded-lg bg-warning/5 hover:border-warning/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.bloomberg.com/news/articles/2024-01-15/apple-iphone-sales-china-resilient-demand",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full">
                                    BREAKING
                                  </span>
                                  <span className="text-xs text-warning font-medium">
                                    Market Moving
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Apple Defies China Slowdown With Resilient
                                  iPhone Demand
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Apple's iPhone sales in China show unexpected
                                  strength despite economic headwinds, with Q4
                                  shipments growing 12% year-over-year. Analysts
                                  attribute this to successful product
                                  segmentation and brand loyalty.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>Bloomberg</span>
                                    </span>
                                    <span>•</span>
                                    <span>45 minutes ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-success">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>Very Positive</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Major News */}
                          <div
                            className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.reuters.com/technology/apple-vision-pro-early-reviews-praise-potential-question-price-2024-01-16/",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                    TECH
                                  </span>
                                  <span className="text-xs text-primary font-medium">
                                    Product Launch
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Apple Vision Pro Receives Rave Reviews, But
                                  Price Remains Concern
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Early reviews praise the revolutionary spatial
                                  computing experience of Apple's Vision Pro,
                                  though the $3,499 price point raises questions
                                  about mainstream adoption potential in the
                                  competitive AR/VR market.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>Reuters</span>
                                    </span>
                                    <span>•</span>
                                    <span>2 hours ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-warning">
                                      <Minus className="w-3 h-3" />
                                      <span>Mixed</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Financial News */}
                          <div
                            className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.wsj.com/finance/stocks/apple-stock-aapl-buyback-dividend-increase-2024-3a5c8f1d",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                                    DIVIDEND
                                  </span>
                                  <span className="text-xs text-green-500 font-medium">
                                    Shareholder Return
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Apple Considers Major Share Buyback Increase
                                  Amid Strong Cash Flow
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Sources indicate Apple's board is discussing a
                                  potential 15% increase in its share repurchase
                                  program and a dividend hike, leveraging the
                                  company's robust cash position of over $180
                                  billion.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>Wall Street Journal</span>
                                    </span>
                                    <span>•</span>
                                    <span>4 hours ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-success">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>Positive</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Regulatory News */}
                          <div
                            className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.cnbc.com/2024/01/15/apple-app-store-changes-eu-digital-markets-act.html",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                                    REGULATORY
                                  </span>
                                  <span className="text-xs text-blue-500 font-medium">
                                    Legal Update
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Apple Announces Major App Store Changes in
                                  Response to EU Regulations
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  In compliance with the EU's Digital Markets
                                  Act, Apple will allow alternative app stores
                                  and payment systems on iOS devices in Europe,
                                  potentially impacting the company's lucrative
                                  services revenue stream.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>CNBC</span>
                                    </span>
                                    <span>•</span>
                                    <span>6 hours ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-destructive">
                                      <TrendingDown className="w-3 h-3" />
                                      <span>Negative</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Analyst Report */}
                          <div
                            className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.marketwatch.com/story/apple-stock-gets-upgraded-at-morgan-stanley-heres-why-2024-01-15",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
                                    ANALYST
                                  </span>
                                  <span className="text-xs text-purple-500 font-medium">
                                    Rating Change
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Morgan Stanley Upgrades Apple to Overweight,
                                  Sees 25% Upside
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Morgan Stanley raises Apple rating citing AI
                                  integration potential and services growth
                                  acceleration. Analyst Katy Huberty sets $220
                                  price target, highlighting upcoming AI
                                  features in iOS 18.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>MarketWatch</span>
                                    </span>
                                    <span>•</span>
                                    <span>8 hours ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-success">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>Very Positive</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Industry News */}
                          <div
                            className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth cursor-pointer group"
                            onClick={() =>
                              window.open(
                                "https://www.ft.com/content/8a7c3e9a-4a5b-4e3d-9c8f-1a2b3c4d5e6f",
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                                    INDUSTRY
                                  </span>
                                  <span className="text-xs text-orange-500 font-medium">
                                    Supply Chain
                                  </span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  Apple Diversifies Supply Chain With Major
                                  Vietnam Manufacturing Expansion
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Apple accelerates its China-plus-one strategy
                                  with a $1 billion investment in Vietnamese
                                  manufacturing facilities for AirPods and Apple
                                  Watch production, reducing reliance on Chinese
                                  suppliers.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Newspaper className="w-3 h-3" />
                                      <span>Financial Times</span>
                                    </span>
                                    <span>•</span>
                                    <span>1 day ago</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1 text-success">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>Positive</span>
                                    </span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* News Summary Stats */}
                        <Card className="financial-card border-0 mt-6">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                              <div>
                                <div className="text-lg font-bold text-success">
                                  12
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Positive News
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-warning">
                                  3
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Neutral News
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-destructive">
                                  2
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Negative News
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-primary">
                                  17
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Total Stories
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent
                        value="predictions"
                        className="space-y-4 mt-0"
                      >
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

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <Card className="border-border/50 bg-background/50">
                                <CardContent className="p-4 text-center">
                                  <div className="text-2xl font-bold text-success mb-1">
                                    $310.5
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Average Target
                                  </div>
                                  <div className="text-xs text-success flex items-center justify-center mt-1">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +2.3% from current
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border-border/50 bg-background/50">
                                <CardContent className="p-4 text-center">
                                  <div className="text-2xl font-bold text-primary mb-1">
                                    Strong Buy
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Consensus Rating
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    42 analysts
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border-border/50 bg-background/50">
                                <CardContent className="p-4 text-center">
                                  <div className="text-2xl font-bold text-warning mb-1">
                                    15.2%
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Upside Potential
                                  </div>
                                  <div className="text-xs text-warning flex items-center justify-center mt-1">
                                    <Target className="w-3 h-3 mr-1" />
                                    High confidence
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border-border/50 bg-background/50">
                                <CardContent className="p-4 text-center">
                                  <div className="text-2xl font-bold text-foreground mb-1">
                                    $280.70
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Current Price
                                  </div>
                                  <div className="text-xs text-success flex items-center justify-center mt-1">
                                    <ArrowUp className="w-3 h-3 mr-1" />
                                    +1.8% today
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <Separator className="my-6" />

                            {/* Analyst Recommendations Breakdown */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-foreground mb-4">
                                Analyst Recommendations
                              </h4>
                              <div className="space-y-3">
                                {/* Strong Buy */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <span className="text-sm font-medium">
                                      Strong Buy
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-muted rounded-full h-2">
                                      <div
                                        className="bg-success h-2 rounded-full"
                                        style={{ width: "65%" }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-muted-foreground w-8">
                                      65%
                                    </span>
                                  </div>
                                </div>

                                {/* Buy */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                    <span className="text-sm font-medium">
                                      Buy
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-muted rounded-full h-2">
                                      <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: "25%" }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-muted-foreground w-8">
                                      25%
                                    </span>
                                  </div>
                                </div>

                                {/* Hold */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                                    <span className="text-sm font-medium">
                                      Hold
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-muted rounded-full h-2">
                                      <div
                                        className="bg-warning h-2 rounded-full"
                                        style={{ width: "8%" }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-muted-foreground w-8">
                                      8%
                                    </span>
                                  </div>
                                </div>

                                {/* Sell */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                                    <span className="text-sm font-medium">
                                      Sell
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-muted rounded-full h-2">
                                      <div
                                        className="bg-destructive h-2 rounded-full"
                                        style={{ width: "2%" }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-muted-foreground w-8">
                                      2%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Price Targets & Market Sentiment */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Price Target Range */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-4">
                                  Price Target Range
                                </h4>
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                      Low Target
                                    </span>
                                    <span className="text-sm font-medium text-destructive">
                                      $150.00
                                    </span>
                                  </div>

                                  <div className="relative pt-2">
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div className="bg-gradient-to-r from-destructive via-warning to-success h-2 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                      <span>$150</span>
                                      <span className="text-foreground font-medium">
                                        Current: $162.30
                                      </span>
                                      <span>$210</span>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                      High Target
                                    </span>
                                    <span className="text-sm font-medium text-success">
                                      $210.00
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Market Sentiment */}
                              <div>
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
                              </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Recent Analyst Actions */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-4">
                                Recent Analyst Actions
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Goldman Sachs
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Maintained Buy • Target $195
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-success">
                                      +5.2% upside
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      2 days ago
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                  <div>
                                    <p className="font-medium text-foreground">
                                      Morgan Stanley
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Upgraded to Overweight • Target $188
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-success">
                                      +3.1% upside
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      1 week ago
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                  <div>
                                    <p className="font-medium text-foreground">
                                      JP Morgan
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Maintained Neutral • Target $165
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-warning">
                                      +1.7% upside
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      2 weeks ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

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
                                    including market trends, financial reports,
                                    news sentiment, and technical indicators to
                                    provide comprehensive investment insights.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
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
