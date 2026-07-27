import React, { useState } from 'react';
import './TradeJournal.css';

export default function TradeJournal({ trades = [] }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const mockTrades = [
    {
      id: 1,
      symbol: 'NIFTY50',
      entry: 19500,
      exit: 19650,
      pnl: 150,
      type: 'long',
      date: '2026-07-27',
      time: '09:45',
      duration: '2h 15m',
      status: 'closed',
      tags: ['breakout', 'support'],
    },
    {
      id: 2,
      symbol: 'BANKNIFTY',
      entry: 45200,
      exit: 45050,
      pnl: -150,
      type: 'short',
      date: '2026-07-27',
      time: '10:30',
      duration: '1h 45m',
      status: 'closed',
      tags: ['resistance', 'reversal'],
    },
    {
      id: 3,
      symbol: 'INFY',
      entry: 1850,
      exit: null,
      pnl: null,
      type: 'long',
      date: '2026-07-27',
      time: '11:15',
      duration: null,
      status: 'open',
      tags: ['trend-following'],
    },
  ];

  const filteredTrades = mockTrades.filter(trade => {
    if (filter === 'winners') return trade.pnl > 0;
    if (filter === 'losers') return trade.pnl < 0;
    if (filter === 'open') return trade.status === 'open';
    return true;
  });

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'pnl') return (b.pnl || 0) - (a.pnl || 0);
    return 0;
  });

  const stats = {
    totalTrades: mockTrades.length,
    winners: mockTrades.filter(t => t.pnl > 0).length,
    losers: mockTrades.filter(t => t.pnl < 0).length,
    totalPnL: mockTrades.reduce((sum, t) => sum + (t.pnl || 0), 0),
  };

  return (
    <div className="trade-journal-card">
      <div className="journal-header">
        <h3 className="journal-title">Trade Journal</h3>
        <div className="journal-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Trades</option>
            <option value="winners">Winners</option>
            <option value="losers">Losers</option>
            <option value="open">Open Trades</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Latest</option>
            <option value="pnl">P&L</option>
          </select>
        </div>
      </div>

      <div className="journal-stats">
        <div className="stat-box">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.totalTrades}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Winners</span>
          <span className="stat-value success">{stats.winners}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Losers</span>
          <span className="stat-value error">{stats.losers}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Total P&L</span>
          <span className={`stat-value ${stats.totalPnL >= 0 ? 'success' : 'error'}`}>
            ₹{stats.totalPnL.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="trades-table-container">
        <table className="trades-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Type</th>
              <th>P&L</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrades.map((trade) => (
              <tr key={trade.id} className={`trade-row ${trade.status}`}>
                <td className="symbol-cell">{trade.symbol}</td>
                <td className="price-cell">{trade.entry}</td>
                <td className="price-cell">{trade.exit || '-'}</td>
                <td className={`type-cell ${trade.type}`}>
                  {trade.type === 'long' ? '🟢 Long' : '🔴 Short'}
                </td>
                <td className={`pnl-cell ${trade.pnl > 0 ? 'profit' : trade.pnl < 0 ? 'loss' : ''}`}>
                  {trade.pnl ? (
                    <>
                      {trade.pnl > 0 ? '+' : ''} ₹{trade.pnl}
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="date-cell">
                  {trade.date} {trade.time}
                </td>
                <td className="duration-cell">{trade.duration || '-'}</td>
                <td className="tags-cell">
                  {trade.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}