// src/app/auth/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Activity, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative">
      
      {/* Background Glow Accent */}
      <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Brand Header */}
      <div className="mb-8 text-center z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-3">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Password Recovery</h1>
        <p className="text-xs text-slate-400 mt-1">Regain secure access to your AxivoraX workspace</p>
      </div>

      {/* Forgot Password Card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-8 shadow-xl z-10">
        
        {submitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-slate-100">Recovery Instructions Sent</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an account exists for <span className="text-slate-200 font-medium">{email}</span>, you will receive password reset instructions shortly.
            </p>
            <div className="pt-4">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Reset your password</h2>
            <p className="text-xs text-slate-400 mb-6">Enter your registered email address and we'll send you a secure recovery link.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder="trader@axivorax.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>Send Recovery Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </>
        )}

      </div>

      {/* Security Footer Badge */}
      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 z-10">
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        <span>Secure cryptographic token verification</span>
      </div>

    </div>
  );
}
