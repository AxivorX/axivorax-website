// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  BrainCircuit, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  TrendingUp 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">AxivoraX</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center relative">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-full text-xs text-indigo-300 mb-6">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span>Powered by Neural Behavioral Diagnostics</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
          Master Your Market Psychology <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">
            With AI Trading Intelligence
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The advanced trading journal and behavioral analytics workspace designed to eliminate emotional mistakes, track risk metrics, and optimize your trading edge.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link href="/auth/signup" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
  
            <span>Explore Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/signup" className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3 rounded-xl transition-colors">
            Initialize Free Workspace
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Engineered for Systematic Traders</h2>
          <p className="text-sm text-slate-400">Everything you need to record executions, inspect behavioral pitfalls, and analyze statistical edge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">Advanced Trade Journal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Record entries, exits, position sizes, and multi-image chart screenshots with rich markdown trading notes.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">AI Behavioral Insights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatic neural scans detect revenge trading, over-leveraging anomalies, and optimal market timing windows.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">Risk Analytics Lab</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculate Sharpe and Sortino ratios, measure drawdown depth curves, and review strategy performance attribution.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 AxivoraX Platform. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/auth/login" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/auth/login" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link href="/auth/login" className="hover:text-slate-300 transition-colors">Security Architecture</Link>
        </div>
      </footer>

    </div>
  );
}
