
interface AnalystRecommendationBreakdown {
    totalAnalysts: string;
    strongBuyOutOf100: string;
    buyOutOf100: string;
    holdOutOf100: string;
    sellOutOf100: string;
    strongSellOutOf100: string;
}
interface AnalystInfo{
    summary: string;
    avgTargetPrice: string;
    lowestTargetPrice: string;
    highestTargetPrice: string;
    rating: string;
    upsidePotential: string;
    currentPrice: string;
    analystRecommendationBreakdown: AnalystRecommendationBreakdown;
    recentAnalystActions: RecentAnalystActions[];

}

interface RecentAnalystActions{
    analystName: string;
    action: string;
    date: string;
    targetPrice: string;
}
export interface AnalystPredictions {
    ticker: string;
    analystInfo: AnalystInfo;
    
}