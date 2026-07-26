// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  BarChart3, 
  BrainCircuit, 
  ShieldCheck, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  PieChart, 
  Zap,
  Settings,
  Bell,
  Radio,
  Cpu,
  RefreshCw
} from 'lucide-react';

export default function DashboardPage() {
  // Live simulation ticker for next-gen feel
  const [livePnL, setLivePnL] = useState(12450.00);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() * 20 - 9.5);
      setLivePnL(prev => Number((prev + fluctuation).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070a] text-slate-900 dark:text-slate-100 flex selection:bg-indigo-600 selection:text-white font-sans transition-colors duration-300">
      
      {/* Next-Gen Floating Sidebar */}
      <aside className="w-72 border-r border-slate-200 dark:border-slate-800/60 bg-white/70 dark:bg-[#080c14]/80 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex sticky top-0 h-screen shadow-sm dark:shadow-none">
        <div className="space-y-8">
          
          {/* Brand Logo & Live Signal Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 block">
                  Axivora<span className="text-indigo-600 dark:text-indigo-400">X</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">Neural Core v3.0</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <Link href="/dashboard" className="flex items-center justify-between px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-semibold text-xs tracking-wide transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Live Telemetry</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </Link>
            
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 font-medium text-xs tracking-wide transition-all">
              <BrainCircuit className="w-4 h-4" />
              <span>Behavioral Engine</span>
            </Link>
            
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 font-medium text-xs tracking-wide transition-all">
              <ShieldCheck className="w-4 h-4" />
              <span>Risk Matrix Lab</span>
            </Link>

            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 font-medium text-xs tracking-wide transition-all">
              <PieChart className="w-4 h-4" />
              <span>Strategy Attribution</span>
            </Link>
          </nav>
        </div>

        {/* User Footer / Active Connection Status */}
        <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 space-y-3">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-[10px] border border-indigo-200 dark:border-indigo-800">
                TR
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-slate-200">System Trader</p>
                <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-pulse" /> WebSocket Online
                </p>
              </div>
            </div>
          </div>

          <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Disconnect Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Dynamic Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800/80 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-widest uppercase border border-indigo-200 dark:border-indigo-500/20">
                Live Feed Active
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">ID: AXV-9082-TR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Command Workspace</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSync}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-sm hover:border-indigo-500 transition-all ${isSyncing ? 'opacity-75' : ''}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-500 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Telemetry</span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-sm relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600"></span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-sm">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Real-Time Metrics Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Live P&L Card with Stream Effect */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#0f1523] dark:to-[#080c14] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net P&amp;L (Real-Time)</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1 tracking-tight font-mono">
              +${livePnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.2% yield stream</span>
            </div>
          </div>

          {/* Win Rate Ratio */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#0f1523] dark:to-[#080c14] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Win Rate Ratio</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 tracking-tight font-mono">68.4%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Sample size: <span className="text-slate-900 dark:text-slate-200 font-bold">48 executions</span>
            </div>
          </div>

          {/* Neural Behavioral Score */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#0f1523] dark:to-[#080c14] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Behavioral Core</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1 tracking-tight font-mono">92 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Zero emotional deviation</span>
            </div>
          </div>

          {/* Profit Factor */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#0f1523] dark:to-[#080c14] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Profit Factor</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 tracking-tight font-mono">2.41</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Optimal risk-to-reward ratio</div>
          </div>

        </div>

        {/* Dynamic Activity Stream & AI Telemetry Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live Order Book / Executions Feed */}
          <div className="lg:col-span-2 bg-white dark:bg-[#080c14]/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">Live Telemetry Ledger</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Incoming execution stream from connected broker node.</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Streaming
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                    <th className="pb-3">Asset / Symbol</th>
                    <th className="pb-3">Direction</th>
                    <th className="pb-3">Position Size</th>
                    <th className="pb-3">Realized P&amp;L</th>
                    <th className="pb-3 text-right">Execution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300 font-medium">
                  <tr>
                    <td className="py-4 font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> NQ / Nasdaq 100
                    </td>
                    <td className="py-4 text-emerald-600 dark:text-emerald-400 font-bold">Long</td>
                    <td className="py-4 font-mono">2 Contracts</td>
                    <td className="py-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">+$1,420.00</td>
                    <td className="py-4 text-right"><span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">Finalized</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> ES / S&amp;P 500
                    </td>
                    <td className="py-4 text-rose-600 dark:text-rose-400 font-bold">Short</td>
                    <td className="py-4 font-mono">4 Contracts</td>
                    <td className="py-4 font-bold text-rose-600 dark:text-rose-400 font-mono">-$380.00</td>
                    <td className="py-4 text-right"><span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-400 text-[10px] font-bold">Finalized</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> BTC / USD
                    </td>
                    <td className="py-4 text-emerald-600 dark:text-emerald-400 font-bold">Long</td>
                    <td className="py-4 font-mono">0.75 BTC</td>
                    <td className="py-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">+$3,150.00</td>
                    <td className="py-4 text-right"><span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">Finalized</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Neural Diagnostics Widget */}
          <div className="bg-gradient-to-br from-indigo-50/80 dark:from-indigo-950/40 via-white dark:via-[#080c14] to-slate-50 dark:to-[#05070a] border border-indigo-200/80 dark:border-indigo-950 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
                <BrainCircuit className="w-4 h-4 animate-pulse" />
                <span>Neural Telemetry Scan</span>
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-2">Optimal Execution Window</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Predictive AI models show your win probability peaks between <span className="text-indigo-600 dark:text-indigo-300 font-bold">09:30 AM – 11:00 AM EST</span> with strict risk parameters.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-500 dark:text-slate-400 font-bold">Model Confidence</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black">94%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full w-[94%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
