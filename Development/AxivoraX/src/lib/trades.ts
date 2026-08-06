// src/lib/trades.ts
import { createClient } from '@/lib/supabase';

export interface Trade {
  id?: string;
  user_id?: string;
  asset: string;
  direction: 'long' | 'short';
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  strategy: string;
  notes?: string;
  pnl?: number;
  return_percent?: number;
  risk_reward_ratio?: string;
  created_at?: string;
}



// Fetch all trades for the currently authenticated user
export async function fetchTrades() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching trades:', error.message);
    return [];
  }
  return data as Trade[];
}

// Insert a new trade into Supabase
export async function createTrade(trade: Omit<Trade, 'id' | 'user_id' | 'created_at'>) {
  const supabase = createClient();
  // Get current logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('trades')
    .insert([
      {
        ...trade,
        user_id: user.id,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error inserting trade:', error.message);
    throw error;
  }
  return data;
}
