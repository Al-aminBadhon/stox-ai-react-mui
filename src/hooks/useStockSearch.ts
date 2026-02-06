import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CompanyResponse } from "@/types/company";

export const useStockSearch = () => {
  const [searchTicker, setSearchTicker] = useState("");
  const [selectedStock, setSelectedStock] = useState<CompanyResponse | null>(
    null
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicker.trim()) return;

    try {
      if (
        searchTicker.trim().toUpperCase() ===
        selectedStock?.ticker.toUpperCase()
      ) {
        return toast({
          title: "Stock Analysis already loaded",
          description: `Loaded data for ${searchTicker.toUpperCase()}`,
        });
      }

      setSearchLoading(true);
      const res = await api.get<CompanyResponse>(
        `research/${searchTicker.toUpperCase()}`
      );

      setSelectedStock(res.data);

      toast({
        title: "Stock Analysis Complete",
        description: `Loaded data for ${searchTicker.toUpperCase()}`,
      });
    } catch (err) {
      console.error("Search failed", err);
      localStorage.clear();
      navigate("/login");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleStockSelect = (ticker: string) => {
    setSearchTicker(ticker);
  };

  return {
    searchTicker,
    setSearchTicker,
    selectedStock,
    setSelectedStock,
    searchLoading,
    handleSearch,
    handleStockSelect,
  };
};
