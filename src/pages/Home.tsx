import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Users,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
      description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
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
                    handleSearch(new Event('submit') as any);
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
                <Badge variant="outline" className="px-3 py-1 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
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
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="end">
              <DropdownMenuItem className="hover:bg-muted/50 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-muted/50 cursor-pointer text-destructive">
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
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Industry</p>
                        <p className="font-medium text-foreground">{selectedStock.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                        <p className="font-medium text-foreground">{selectedStock.founded}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <User className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CEO</p>
                        <p className="font-medium text-foreground">{selectedStock.ceo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-destructive/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Market Cap</p>
                        <p className="font-medium text-foreground">$2.8T</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedStock.description}
                  </p>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <Card className="financial-card">
                <CardContent className="p-0">
                  <Tabs defaultValue="news" className="w-full">
                    <div className="border-b border-border p-6 pb-0">
                      <TabsList className="grid w-full grid-cols-4 bg-muted/30">
                        <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                          <Newspaper className="w-4 h-4" />
                          Recent News
                        </TabsTrigger>
                        <TabsTrigger value="predictions" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                          <BarChart3 className="w-4 h-4" />
                          Analyst Predictions
                        </TabsTrigger>
                        <TabsTrigger value="investors" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                          <Users className="w-4 h-4" />
                          Top Investors
                        </TabsTrigger>
                        <TabsTrigger value="guidelines" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                          <BookOpen className="w-4 h-4" />
                          Investment Guidelines
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <div className="p-6">
                      <TabsContent value="news" className="space-y-4 mt-0">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Latest Market News</h3>
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-smooth">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground mb-2">
                                    Apple Reports Strong Q4 Earnings with Revenue Growth
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    The tech giant exceeded expectations with a 12% year-over-year revenue increase...
                                  </p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <span>Bloomberg</span>
                                    <span className="mx-2">•</span>
                                    <span>2 hours ago</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground ml-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="predictions" className="space-y-4 mt-0">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Analyst Forecasts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border-border/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-success mb-1">$185</div>
                              <div className="text-sm text-muted-foreground">Average Target</div>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-primary mb-1">Buy</div>
                              <div className="text-sm text-muted-foreground">Consensus Rating</div>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-warning mb-1">15%</div>
                              <div className="text-sm text-muted-foreground">Upside Potential</div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="investors" className="space-y-4 mt-0">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Institutional Holdings</h3>
                        <p className="text-muted-foreground">
                          AI-powered analysis of top institutional investors and their holdings...
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="guidelines" className="space-y-4 mt-0">
                        <h3 className="text-lg font-semibold text-foreground mb-4">AI Investment Insights</h3>
                        <p className="text-muted-foreground">
                          Comprehensive investment guidelines based on multiple AI models analysis...
                        </p>
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