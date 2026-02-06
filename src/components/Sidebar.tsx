import React from "react";
import { Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/ui/logo";

interface SearchHistory {
  ticker: string;
  timestamp: string;
  name: string;
}

interface SidebarProps {
  searchTicker: string;
  onSearchTickerChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onHistorySelect: (ticker: string) => void;
  searchLoading?: boolean;
}

const searchHistory: SearchHistory[] = [
  { ticker: "AAPL", timestamp: "2 hours ago", name: "Apple Inc." },
  { ticker: "GOOGL", timestamp: "1 day ago", name: "Alphabet Inc." },
  { ticker: "MSFT", timestamp: "2 days ago", name: "Microsoft Corp." },
  { ticker: "TSLA", timestamp: "3 days ago", name: "Tesla Inc." },
  { ticker: "AMZN", timestamp: "1 week ago", name: "Amazon.com Inc." },
];

export const Sidebar: React.FC<SidebarProps> = ({
  searchTicker,
  onSearchTickerChange,
  onSearch,
  onHistorySelect,
  searchLoading = false,
}) => {
  return (
    <div className="w-80 bg-card border-r border-border shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <Logo size="md" />
      </div>

      {/* Search Section */}
      <div className="p-6 border-b border-border">
        <form onSubmit={onSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter ticker (e.g., AAPL)"
              value={searchTicker}
              onChange={(e) => onSearchTickerChange(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
              disabled={searchLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full h-10 bg-gradient-primary hover:opacity-90 font-medium"
            disabled={searchLoading}
          >
            <Search className="w-4 h-4 mr-2" />
            {searchLoading ? "Searching..." : "Analyze Stock"}
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
                onClick={() => onHistorySelect(item.ticker)}
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
  );
};
