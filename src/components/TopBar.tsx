import React from "react";
import { User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CompanyResponse } from "@/types/company";

interface TopBarProps {
  selectedStock: CompanyResponse | null;
  userName: string | null;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedStock,
  userName,
  onLogout,
}) => {
  return (
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
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                {userName ? userName.substring(0, 2).toUpperCase() : "GT"}
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
            onClick={onLogout}
            className="hover:bg-muted/50 cursor-pointer text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
