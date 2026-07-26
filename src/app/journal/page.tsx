// src/app/journal/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Image as ImageIcon, 
  TrendingUp, 
  TrendingDown, 
  X, 
  Save,
  Loader2
} from 'lucide-react';
import { fetchTrades, createTrade, Trade } from '@/lib/trades';

export default function JournalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state fields
  const [asset, setAsset] = useState('');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [strategy, setStrategy] = useState('Breakout / Retest');
  const [notes, setNotes] = useState('');

  // Load trades on mount
  useEffect(() => {
    loadTrades();
  }, []);

  async function loadTrades() {
    setLoading(true);
    const data = await fetchTrades();
    setTrades(data);
    setLoading(false);
  }

  async function handleSaveTrade(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createTrade({
        asset,
        direction,
        entry_price: parseFloat(entryPrice) || 0,
        stop_loss: parseFloat(stopLoss) || 0,
        take_profit: parseFloat(takeProfit) || 0,
        strategy,
        notes,
        pnl: 150.00, // Example placeholder calculation or compute dynamically
        return_percent: 1.5,
        risk_reward_ratio: '1 : 2.0'
      });

      // Reset form & close modal
      setIsModalOpen(false);
      setAsset('');
      setEntryPrice('');
      setStopLoss('');
      setTakeProfit('');
      setNotes('');
      
      // Refresh list
      await loadTrades();
    } catch (err) {
      alert('Failed to save trade. Make sure you are signed in.');
    } finally {
      setSubmitting(false);
    }
  }

  // Filter trades based on search query
  const filteredTrades = trades.filter(t => 
    t.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.strategy?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 relative">
      
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-sm text-slate-400">Log, review, and annotate your market executions securely via Supabase.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search ticker or setup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Trade
          </button>
        </div>
      </header>

      {/* Trade Log Table */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
            <span>Loading database records...</span>
          </div>
        ) : filteredTrades.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-sm">No recorded executions found.</p>
            <p className="text-xs mt-1">Click "Add Trade" to log your first setup.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-medium">Asset & Setup</th>
                  <th className="py-4 px-6 font-medium">Direction</th>
                  <th className="py-4 px-6 font-medium">Date / Time</th>
                  <th className="py-4 px-6 font-medium">R:R Achieved</th>
                  <th className="py-4 px-6 font-medium text-right">Net P&L</th>
                  <th className="py-4 px-6 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-100 mb-0.5">{trade.asset}</div>
                      <div className="text-xs text-slate-500">{trade.strategy}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                        trade.direction === 'long' 
                          ? 'text-emerald-400 bg-emerald-500/10' 
                          : 'text-rose-400 bg-rose-500/10'
                      }`}>
                        {trade.direction === 'long' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} 
                        {trade.direction.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      <div>{trade.created_at ? new Date(trade.created_at).toLocaleDateString() : 'Just now'}</div>
                      <div className="text-xs">{trade.created_at ? new Date(trade.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-200">{trade.risk_reward_ratio || '1 : 1'}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={`font-bold ${(trade.pnl || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {(trade.pnl || 0) >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl || 0)}`}
                      </div>
                      <div className="text-xs text-slate-500">{trade.return_percent}%</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-slate-400 hover:text-indigo-400 transition-colors p-1">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Trade Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-lg font-bold">Log New Execution to Supabase</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrade} className="p-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Asset / Ticker</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. AAPL, BTC/USD" 
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Direction</label>
                  <select 
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as 'long' | 'short')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="long">Long (Buy)</option>
                    <option value="short">Short (Sell)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Entry Price</label>
                  <input 
                    type="number" 
                    step="any"
                    required
                    placeholder="0.00" 
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Stop Loss</label>
                  <input 
                    type="number" 
                    step="any"
                    required
                    placeholder="0.00" 
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Take Profit</label>
                  <input 
                    type="number" 
                    step="any"
                    required
                    placeholder="0.00" 
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Setup / Strategy</label>
                <select 
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option>Breakout / Retest</option>
                  <option>Mean Reversion</option>
                  <option>Trend Pullback</option>
                  <option>News Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Behavioral Notes</label>
                <textarea 
                  rows={4} 
                  placeholder="What was your mindset? Did you follow your rules?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center hover:bg-slate-950/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-sm font-medium text-slate-300">Attach Chart Screenshots</span>
                <span className="text-xs text-slate-500 mt-1">Drag and drop or click to browse</span>
              </div>

              <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 pt-4 flex justify-end gap-3 z-10">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save to Journal</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
