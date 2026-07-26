import axios from 'axios';

const FYERS_BASE_URL = 'https://api-t1.fyers.in/api/v3';

export interface FyersTrade {
  id: string;
  symbol: string;
  side: number; // 1 for Buy, -1 for Sell
  tradedPrice: number;
  tradedQty: number;
  tradeDate: string;
  orderNumber: string;
}

export async function fetchFyersTradebook(accessToken: string, appId: string) {
  try {
    const response = await axios.get(`${FYERS_BASE_URL}/tradebook`, {
      headers: {
        'Authorization': `${appId}:${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data && response.data.s === 'ok') {
      return {
        success: true,
        trades: response.data.tradeBook || [],
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to fetch tradebook from Fyers.',
      };
    }
  } catch (error: any) {
    console.error('Error connecting to Fyers Tradebook API:', error.response?.data || error.message);
    return {
      success: false,
      error: 'Exception occurred while fetching trade history.',
    };
  }
}

export async function fetchFyersPositions(accessToken: string, appId: string) {
  try {
    const response = await axios.get(`${FYERS_BASE_URL}/positions`, {
      headers: {
        'Authorization': `${appId}:${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data && response.data.s === 'ok') {
      return {
        success: true,
        overall: response.data.overall || {},
        netPositions: response.data.netPositions || [],
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to fetch positions.',
      };
    }
  } catch (error: any) {
    console.error('Error connecting to Fyers Positions API:', error.response?.data || error.message);
    return {
      success: false,
      error: 'Exception occurred while fetching positions.',
    };
  }
}
