// src/app/insights/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingDown, 
  Zap, 
  RefreshCcw, 
  SlidersHorizontal 
} from 'lucide-react';

export default function AIInsightsPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <BrainCircuit className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">AxivoraX Neural Core</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AI Behavioral Insights</h1>
          <p className="text-sm text-slate-400">Automated psychological diagnostics and execution flaw identification.</p>
        </div>

        <button 
          onClick={handleRunScan}
          disabled={isScanning}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
        >
          <RefreshCcw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Analyzing Journal Patterns...' : 'Run Deep Neural Scan'}
        </button>
      </header>

      {/* Scan Status Alert Banner */}
      {scanComplete && (
        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs text-emerald-200">
            <span className="font-semibold">Neural scan completed successfully.</span> Analyzed 56 recent executions across 3 linked brokerage accounts. 2 new behavioral anomalies flagged.
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Emotional Discipline Score</span>
          <div className="text-2xl font-bold text-amber-400 mt-2">74 / 100</div>
          <p className="text-xs text-slate-500 mt-1">Moderate risk of FOMO chasing on volatile openings.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Revenge Trade Probability</span>
          <div className="text-2xl font-bold text-rose-400 mt-2">18.2%</div>
          <p className="text-xs text-slate-500 mt-1">Spikes by 31% following consecutive morning losses.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rule Adherence Index</span>
          <div className="text-2xl font-bold text-emerald-400 mt-2">89.5%</div>
          <p className="text-xs text-slate-500 mt-1">Stop-loss placement consistency is optimal.</p>
        </div>
      </section>

      {/* Active Diagnostics Grid */}
      <h2 className="text-lg font-semibold mb-4">Active Behavioral Diagnostics</h2>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Diagnostic Card 1: Warning */}
        <div className="bg-slate-900 border border-rose-950/60 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-wider bg-rose-950/80 border border-rose-900/50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> High Severity Flaw
              </span>
              <span className="text-xs text-slate-500">Detected Today</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">Over-Leveraging After Drawdowns</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Our neural logs indicate that when your account takes an initial loss exceeding $200 in a session, your subsequent position size increases by an average of 2.4x without structural setup confirmation.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs">
            <span className="text-indigo-400 font-semibold block mb-1">AI Recommendation:</span>
            <span className="text-slate-400">Enable the AxivoraX "Cool-down Lock" to temporarily disable trade execution for 30 minutes following any stopped-out position.</span>
          </div>
        </div>

        {/* Diagnostic Card 2: Optimization Notice */}
        <div className="bg-slate-900 border border-indigo-950/60 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider bg-indigo-950/80 border border-indigo-900/50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> Edge Optimization
              </span>
              <span className="text-xs text-slate-500">Continuous Scan</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">Session Timing Efficiency</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your win rate during the New York market open session (13:30 - 15:00 UTC) stands at 81%, compared to a 44% win rate during late afternoon hours. Focusing activity exclusively on your primary window could boost monthly net P&L by up to 38%.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs">
            <span className="text-indigo-400 font-semibold block mb-1">AI Recommendation:</span>
            <span className="text-slate-400">Restrict manual entries outside of 13:30 - 16:00 UTC through journal preset filters.</span>
          </div>
        </div>

      </section>

    </div>
  );
}
