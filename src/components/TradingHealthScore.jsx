import React from 'react';
import './TradingHealthScore.css';

export default function TradingHealthScore({ stats = { winRate: 68, profitFactor: 2.4, riskReward: '1:1.8' } }) {
  // Determine health status based on win rate
  const getHealthStatus = (winRate) => {
    if (winRate >= 70) return 'Excellent';
    if (winRate >= 60) return 'Good';
    if (winRate >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const healthStatus = getHealthStatus(stats.winRate);

  return (
    <div className="health-score-card">
      <div className="health-card-header">
        <span className="health-badge">Trading Health Score</span>
        <span className="health-score-value">{stats.winRate}% Win Rate</span>
      </div>
      
      <div className="health-status-indicator">
        <span className={`status-label ${healthStatus.toLowerCase().replace(' ', '-')}`}>
          {healthStatus}
        </span>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">Profit Factor</span>
          <span className="metric-val highlight">{stats.profitFactor}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Risk/Reward</span>
          <span className="metric-val">{stats.riskReward}</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${stats.winRate}%` }}></div>
      </div>

      <div className="health-footer">
        <span className="health-text">Performance metric based on last 100 trades</span>
      </div>
    </div>
  );
}