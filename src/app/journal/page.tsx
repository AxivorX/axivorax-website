// src/app/journal/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  X, 
  Upload, 
  CheckCircle2 
} from 'lucide-react';

export default function TradeJournalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'wins' | 'losses'>('all');

  // Form State for Add Trade Modal
  const [asset, setAsset] = useState('');
  const [tradeType, setTradeType] = useState('LONG');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [size, setSize] = useState('');
  const [pnl, setPnl] = useState('');
  const [notes, setNotes] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);

  // Mock handler for adding a screenshot preview
  const handleSimulatedUpload = () => {
    setScreenshots([...screenshots, `chart_snapshot_${screenshots.length + 1}.png`]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 relative">
      
      {/* Header & Actions */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-sm text-slate-400">Record, review, and evaluate your market executions with precision.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Trade
          </button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <section className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 mb-6 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <input 
              type="text" 
              placeholder="Search by asset, setup, or tag..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <button className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 w-full lg:w-auto justify-center">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All Trades (56)
          </button>
          <button 
            onClick={() => setActiveTab('wins')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === 'wins' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Wins (38)
          </button>
          <button 
            onClick={() => setActiveTab('losses')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === 'losses' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Losses (18)
          </button>
        </div>
      </section>

      {/* Main Journal Data Table */}
      <section className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-500 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Asset / Setup</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Entry / Exit</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Attachments & Notes</th>
                <th className="py-3 px-4 text-right">Net P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-100">BTC/USDT</div>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Breakout Strategy</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium flex items-center gap-1 w-max">
                    <ArrowUpRight className="w-3 h-3" /> LONG
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-slate-400">
                  <div>62,450.00 → 64,120.00</div>
                  <div className="text-[10px] text-slate-500">Today, 14:20 UTC</div>
                </td>
                <td className="py-4 px-4 text-slate-300">0.5 BTC</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-2 py-1 rounded">
                      <ImageIcon className="w-3.5 h-3.5" /> 2 Charts
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      <FileText className="w-3.5 h-3.5" /> Notes
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-emerald-400">+$835.00</td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-100">EUR/USD</div>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Trend Pullback</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded font-medium flex items-center gap-1 w-max">
                    <ArrowDownRight className="w-3 h-3" /> SHORT
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-slate-400">
                  <div>1.0845 → 1.0875</div>
                  <div className="text-[10px] text-slate-500">Yesterday, 09:15 UTC</div>
                </td>
                <td className="py-4 px-4 text-slate-300">1.5 Lot</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-2 py-1 rounded">
                      <ImageIcon className="w-3.5 h-3.5" /> 1 Chart
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      <FileText className="w-3.5 h-3.5" /> Notes
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-rose-400">-$450.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Trade Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-xl h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            
            {/* Modal Header */}
            <div>
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800">
                <h2 className="text-lg font-bold">Add Trade Entry</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-100 bg-slate-800 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Asset Symbol</label>
                    <input 
                      type="text" 
                      placeholder="e.g. BTC/USDT or AAPL" 
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Direction</label>
                    <select 
                      value={tradeType}
                      onChange={(e) => setTradeType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="LONG">LONG (Buy)</option>
                      <option value="SHORT">SHORT (Sell)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Entry Price</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Exit Price</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={exitPrice}
                      onChange={(e) => setExitPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Position Size</label>
                    <input 
                      type="text" 
                      placeholder="Size / Lots" 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Realized Net P&L ($)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 340.50 or -125.00" 
                    value={pnl}
                    onChange={(e) => setPnl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Attach Screenshots Section */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Attach Chart Screenshots</label>
                  <div 
                    onClick={handleSimulatedUpload}
                    className="border-2 border-dashed border-slate-800 hover:border-indigo-500 bg-slate-950/50 rounded-lg p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-slate-300">Click to upload charts or drop images here</span>
                  </div>
                  {screenshots.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {screenshots.map((file, idx) => (
                        <span key={idx} className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-300 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trading Notes */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Trading Notes & Psychological State</label>
                  <textarea 
                    rows={4} 
                    placeholder="Why did you take this trade? What were your emotions during execution?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-6 border-t border-slate-800 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Save Trade Entry
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
