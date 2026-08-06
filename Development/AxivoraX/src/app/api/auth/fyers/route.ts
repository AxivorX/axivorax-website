import { NextResponse } from 'next/server';

export async function GET() {
  const FYERS_APP_ID = process.env.FYERS_CLIENT_ID; // Your App ID from Fyers API Dashboard
  const REDIRECT_URI = process.env.FYERS_REDIRECT_URI; // e.g., https://yourdomain.com/api/auth/fyers/callback

  if (!FYERS_APP_ID || !REDIRECT_URI) {
    return NextResponse.json(
      { error: 'Fyers API credentials are not properly configured in environment variables.' },
      { status: 500 }
    );
  }

  // Construct the official Fyers v3 OAuth login URL
  const fyersAuthUrl = `https://api-t1.fyers.in/api/v3/generate-authcode?client_id=${FYERS_APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&state=sample_state`;

  // Redirect the user to Fyers login screen
  return NextResponse.redirect(fyersAuthUrl);
}
