import { useState, useCallback } from "react";
import api from "@/lib/axios";
import { AnalystPredictions } from "@/types/analystInfo";
import { GuidelineInfoResponse } from "@/types/guidelineInfo";

interface TabData {
  news: any | null;
  predictions: AnalystPredictions | null;
  guidelines: GuidelineInfoResponse | null;
}

export const useTabData = () => {
  const [tabData, setTabData] = useState<TabData>({
    news: null,
    predictions: null,
    guidelines: null,
  });
  const [loadingTab, setLoadingTab] = useState<string | null>(null);

  const fetchTabData = useCallback(
    async (tab: string, ticker: string) => {
      if (!ticker.trim()) return;

      // Check if data already exists
      if (
        (tab === "news" && tabData.news) ||
        (tab === "predictions" && tabData.predictions) ||
        (tab === "guidelines" && tabData.guidelines)
      ) {
        return;
      }

      try {
        setLoadingTab(tab);

        if (tab === "predictions") {
          const res = await api.get<AnalystPredictions>(
            `/research/analyst/${ticker.toUpperCase()}`
          );
          setTabData((prev) => ({
            ...prev,
            predictions: res.data,
          }));
        }

        if (tab === "guidelines") {
          const res = await api.get(
            `/research/guideline/${ticker.toUpperCase()}`
          );
          // Simulate delay if needed, or remove the setTimeout
          setTabData((prev) => ({
            ...prev,
            guidelines: res.data.guideLineInfo,
          }));
        }
      } catch (error) {
        console.log("Tab data fetch error:", error);
      } finally {
        setLoadingTab(null);
      }
    },
    [tabData]
  );

  const resetTabData = useCallback(() => {
    setTabData({
      news: null,
      predictions: null,
      guidelines: null,
    });
  }, []);

  return {
    tabData,
    loadingTab,
    fetchTabData,
    resetTabData,
  };
};
