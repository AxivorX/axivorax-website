// src/app/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Download, 
  PieChart 
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('YTD');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Analytics Lab</h1>
          <p className="text-sm text-slate-400">Advanced risk metrics, drawdown analysis, and strategy performance attribution.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            {['1M', '3M', 'YTD', 'All'].map((t) => (
              <button 
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${timeframe === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4 text-slate-400" />
            Export Report
          </button>
        </div>
      </header>

      {/* Risk-Adjusted Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Sharpe Ratio</div>
          <div className="text-2xl font-bold text-slate-100">2.42</div>
          <p className="text-xs text-emerald-400 mt-1">Excellent risk-adjusted returns</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Sortino Ratio</div>
          <div className="text-2xl font-bold text-slate-100">3.15</div>
          <p className="text-xs text-emerald-400 mt-1">Minimal downside volatility</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Max Drawdown</div>
          <div className="text-2xl font-bold text-rose-400">-6.4%</div>
          <p className="text-xs text-slate-500 mt-1">Controlled risk threshold</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Expectancy / Trade</div>
          <div className="text-2xl font-bold text-emerald-400">+$76.50</div>
          <p className="text-xs text-slate-500 mt-1">Statistically positive edge</p>
        </div>
      </section>

      {/* Main Charts Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Drawdown Depth Chart (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Drawdown Depth Analysis</h2>
          <p className="text-xs text-slate-400 mb-6">Percentage decline from peak equity over the selected horizon</p>
          
          <div className="h-56 w-full flex items-end gap-1.5 pt-6 px-2 border-b border-slate-800">
            {[0, -1, -3, 0, -2, -5, -4, -6.4, -3, -1, 0, -2, 0, -1, 0].map((val, idx) => (
              <div key={idx} className="flex-1 bg-rose-500/20 hover:bg-rose-500/40 rounded-t transition-all relative group" style={{ height: `${Math.abs(val) * 10 + 5}%` }}>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  Drawdown: {val}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-3">
            <span>Period Start</span>
            <span>Mid-Cycle Peak</span>
            <span>Current</span>
          </div>
        </div>

        {/* Strategy Breakdown Card (Spans 1 col) */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Strategy Performance</h2>
            <p className="text-xs text-slate-400 mb-4">P&L attribution by primary trading setup</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Breakout Momentum</span>
                  <span className="text-emerald-400 font-semibold">+$2,840 (66%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Trend Pullback</span>
                  <span className="text-emerald-400 font-semibold">+$1,120 (26%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Mean Reversion</span>
                  <span className="text-amber-400 font-semibold">+$325 (8%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-6 text-xs text-slate-400 flex justify-between">
            <span>Total Tracked Strategies: 3</span>
            <span className="text-indigo-400 font-medium">View Matrix →</span>
          </div>
        </div>

      </section>

    </div>
  );
}
