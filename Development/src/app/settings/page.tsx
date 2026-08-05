// src/app/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Link2, 
  Bell, 
  Key, 
  CheckCircle2, 
  Save 
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'security' | 'notifications'>('profile');
  const [saved, setSaved] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@axivorax.com');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [apiSynced, setApiSynced] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-sm text-slate-400">Manage your profile, broker API connections, and risk thresholds.</p>
        </div>

        {saved && (
          <div className="bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Preferences updated successfully
          </div>
        )}
      </header>

      {/* Main Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <User className="w-4 h-4" />
            Profile & General
          </button>

          <button 
            onClick={() => setActiveTab('connections')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'connections' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Link2 className="w-4 h-4" />
            Broker APIs & Sync
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Shield className="w-4 h-4" />
            Security & 2FA
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Bell className="w-4 h-4" />
            Alerts & Warnings
          </button>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-sm">
          
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Trader Profile Settings</h2>
                <p className="text-xs text-slate-400">Update your account identity and base reporting preferences.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name / Alias</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Default Reporting Currency</label>
                  <select 
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="USDT">USDT (Crypto)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'connections' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Broker API & Account Integrations</h2>
                <p className="text-xs text-slate-400">Connect live trading accounts for automated execution syncing.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold">BN</div>
                    <div>
                      <div className="font-semibold text-sm">Binance Futures API</div>
                      <span className="text-xs text-emerald-400">Connected & Syncing</span>
                    </div>
                  </div>
                  <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors">
                    Configure Keys
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">IB</div>
                    <div>
                      <div className="font-semibold text-sm">Interactive Brokers Gateway</div>
                      <span className="text-xs text-slate-500">Not Linked</span>
                    </div>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    Connect Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Security & Encryption</h2>
                <p className="text-xs text-slate-400">Manage two-factor authentication and active session keys.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Two-Factor Authentication (2FA)</div>
                    <span className="text-xs text-emerald-400">Active via Authenticator App</span>
                  </div>
                  <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors">
                    Manage 2FA
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Master Password Reset</div>
                    <span className="text-xs text-slate-400">Last changed 3 months ago</span>
                  </div>
                  <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Alerts & Warning Thresholds</h2>
                <p className="text-xs text-slate-400">Configure when the AI Behavioral Engine triggers live warnings.</p>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-300">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0" />
                  <span>Warn me instantly when position size exceeds calculated risk limit</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0" />
                  <span>Notify via email on consecutive morning losses</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0" />
                  <span>Send weekly performance summary report</span>
                </label>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
