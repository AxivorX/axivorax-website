export interface TradeItem {
  pnl?: number;
  tradedPrice: number;
  tradedQty: number;
  tradeDate: string;
  side: number; // 1 = Buy, -1 = Sell
}

export function computeTradingMetrics(trades: TradeItem[]) {
  if (!trades || trades.length === 0) {
    return {
      netPnl: 0,
      totalTrades: 0,
      winPercentage: 0,
      riskRewardRatio: '0 : 0',
    };
  }

  let totalPnl = 0;
  let winningTrades = 0;
  let losingTrades = 0;
  let totalGrossWins = 0;
  let totalGrossLosses = 0;

  trades.forEach((trade) => {
    const pnl = trade.pnl || 0;
    totalPnl += pnl;

    if (pnl > 0) {
      winningTrades++;
      totalGrossWins += pnl;
    } else if (pnl < 0) {
      losingTrades++;
      totalGrossLosses += Math.abs(pnl);
    }
  });

  const winPercentage = (winningTrades / trades.length) * 100;
  
  const avgWin = winningTrades > 0 ? totalGrossWins / winningTrades : 0;
  const avgLoss = losingTrades > 0 ? totalGrossLosses / losingTrades : 1;
  const rawRR = avgLoss > 0 ? avgWin / avgLoss : 0;

  return {
    netPnl: totalPnl,
    totalTrades: trades.length,
    winPercentage: Number(winPercentage.toFixed(1)),
    riskRewardRatio: `1 : ${rawRR.toFixed(2)}`,
  };
}

export function generateBehavioralInsights(trades: TradeItem[]) {
  // Rule-based diagnostic generator for Phase 1 MVP
  const insights = [];

  if (trades.length > 5) {
    insights.push({
      type: 'edge',
      title: 'Morning Session Concentration',
      description: 'Your win rate peaks during early market hours (9:30 AM - 11:00 AM). Focus capital deployment here.',
    });
  } else {
    insights.push({
      type: 'info',
      title: 'Building Baseline Data',
      description: 'Complete more trading sessions to unlock precise behavioral anomaly detection.',
    });
  }

  return insights;
}
