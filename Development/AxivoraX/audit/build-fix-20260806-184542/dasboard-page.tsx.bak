// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Activity, 
  ShieldAlert, 
  Plus, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Top Navigation / Header Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trading Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome back. Here is your portfolio performance summary.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Account Selector Dropdown */}
          <div className="relative">
            <select 
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option>All Accounts</option>
              <option>Binance Futures</option>
              <option>Interactive Brokers</option>
              <option>Manual Paper Journal</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Date Range Selector */}
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Year-to-Date (YTD)</option>
              <option>All-Time</option>
            </select>
            <Calendar className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Quick Add Trade Trigger */}
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Add Trade
          </button>
        </div>
      </header>

      {/* Row 1: KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Net P&L */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Net P&L</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">+$4,285.50</span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">+14.2%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">vs. previous period ($3,750.00)</p>
        </div>

        {/* Win Rate */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Win Rate</span>
            <Percent className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">68.4%</span>
            <span className="text-xs font-medium text-slate-400">38W / 18L</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '68.4%' }}></div>
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Profit Factor</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">2.14</span>
            <span className="text-xs font-medium text-emerald-400">Target > 1.5</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Gross Profit ($8,400) / Gross Loss ($3,920)</p>
        </div>

        {/* Avg Risk-to-Reward */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Risk:Reward</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">1 : 2.3</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Realized outcome consistency score: High</p>
        </div>
      </section>

      {/* Row 2: Main Equity Curve Chart Placeholder */}
      <section className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Equity Curve & Portfolio Growth</h2>
            <p className="text-xs text-slate-400">Cumulative net profit tracking over selected timeline</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition-colors">P&L ($)</button>
            <button className="text-xs text-slate-400 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">Return (%)</button>
          </div>
        </div>
        
        {/* Mock Chart Area */}
        <div className="h-64 w-full flex items-end gap-2 pt-6 px-2 border-b border-slate-800">
          {[40, 45, 38, 60, 55, 75, 70, 85, 80, 95, 90, 110, 105, 130, 125, 150].map((val, idx) => (
            <div key={idx} className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/40 rounded-t transition-all relative group" style={{ height: `${val}%` }}>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                Day {idx + 1}: +${val * 35}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-3">
          <span>Day 1</span>
          <span>Day 8</span>
          <span>Day 16</span>
        </div>
      </section>

      {/* Row 3: Split Pane (Recent Trades Table & AI Insights Snippet) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Trades Table (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Trades</h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View Full Journal →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4 text-right">Net P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-100">BTC/USDT</td>
                  <td className="py-3 px-4"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">LONG</span></td>
                  <td className="py-3 px-4 text-slate-400">Today, 14:20</td>
                  <td className="py-3 px-4 text-slate-400">0.5 BTC</td>
                  <td className="py-3 px-4 text-right font-medium text-emerald-400">+$340.00</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-100">EUR/USD</td>
                  <td className="py-3 px-4"><span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded">SHORT</span></td>
                  <td className="py-3 px-4 text-slate-400">Yesterday</td>
                  <td className="py-3 px-4 text-slate-400">1.0 Lot</td>
                  <td className="py-3 px-4 text-right font-medium text-rose-400">-$125.50</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-100">NVDA</td>
                  <td className="py-3 px-4"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">LONG</span></td>
                  <td className="py-3 px-4 text-slate-400">Oct 24</td>
                  <td className="py-3 px-4 text-slate-400">50 Shrs</td>
                  <td className="py-3 px-4 text-right font-medium text-emerald-400">+$620.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights Snippet (Spans 1 column) */}
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950/20 border border-indigo-900/40 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-3">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-slate-100">AI Insights Feed</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Real-time behavioral analysis and pattern checks.</p>
            
            <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-lg p-4 mb-4">
              <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider bg-indigo-900/60 px-2 py-0.5 rounded">Warning Detected</span>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                You have taken 3 consecutive trades outside your core market session hours today, resulting in a 42% decrease in win rate efficiency.
              </p>
            </div>
          </div>

          <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-medium transition-colors">
            View All AI Analytics →
          </button>
        </div>

      </section>
    </div>
  );
}
