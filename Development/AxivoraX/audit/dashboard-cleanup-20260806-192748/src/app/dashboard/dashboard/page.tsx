import { cookies } from 'next/headers';
import { fetchFyersTradebook } from '@/lib/fyersService';
import { computeTradingMetrics, generateBehavioralInsights } from '@/lib/analysisEngine';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('fyers_access_token')?.value;
  const appId = process.env.FYERS_CLIENT_ID || '';

  // Fallback mock data structure if no active broker token is present yet
  let rawTrades: any[] = [];
  let isConnectedLive = false;

  if (accessToken) {
    const response = await fetchFyersTradebook(accessToken, appId);
    if (response.success) {
      rawTrades = response.trades;
      isConnectedLive = true;
    }
  }

  // Compute metrics using analysis engine
  const metrics = computeTradingMetrics(rawTrades);
  const insights = generateBehavioralInsights(rawTrades);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Trading Intelligence Workspace</h1>
          <p className="text-sm text-slate-400 mt-1">
            {isConnectedLive 
              ? '🟢 Live data successfully synchronized via Fyers API v3.' 
              : '🟡 Demo Mode: Connect your broker via onboarding to stream real trades.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isConnectedLive && (
            <a
              href="/api/auth/fyers"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10"
            >
              Connect Fyers Account
            </a>
          )}
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Net Realized P&L</p>
          <p className={`text-3xl font-black ${metrics.netPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ₹{metrics.netPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Win Rate Percentage</p>
          <p className="text-3xl font-black text-white">{metrics.winPercentage}%</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Total Executed Trades</p>
          <p className="text-3xl font-black text-white">{metrics.totalTrades}</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Risk-to-Reward Profile</p>
          <p className="text-3xl font-black text-emerald-400">{metrics.riskRewardRatio}</p>
        </div>
      </div>

      {/* Behavioral Insights Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-wide">Behavioral Edge Diagnostic Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {insight.type}
              </span>
              <h3 className="text-base font-bold text-slate-200">{insight.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
