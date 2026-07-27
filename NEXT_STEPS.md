# AxivoraX - Next Steps Implementation Guide

## 🎯 Phase 1: Test & Run Locally

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Git repository cloned locally

### Step 1: Install Dependencies

```bash
# Install root dependencies (Express, CORS, etc.)
npm install

# Install frontend dependencies
cd src
npm install
cd ..
```

### Step 2: Configure Environment Variables

```bash
# Create .env file from template
cp .env.example .env.local

# Edit with your actual credentials
# Leave mock values for testing
```

### Step 3: Start Development Servers

**Terminal 1 - Start Backend (Port 5000)**
```bash
npm run dev
# Output: AxivoraX Backend Server running on port 5000
```

**Terminal 2 - Start Frontend (Port 3000)**
```bash
cd src
npm run dev
# Output: Vite dev server running at http://localhost:3000
```

### Step 4: Test the Application

1. Open `http://localhost:3000` in your browser
2. Click **"Explore Demo Sandbox"** button
3. Verify dashboard loads with:
   - ✅ AI Command Center widget
   - ✅ Trading Health Score card
   - ✅ Equity Curve chart
4. Click "Refresh Insights" to test API calls
5. Verify Console shows API responses from backend

---

## 🔗 Phase 2: Connect Live FYERS API

### Overview
Replace mock authentication with real FYERS OAuth2 integration for live broker connectivity.

### Architecture Flow
```
Frontend (React)
    ↓
[Onboarding] → "Connect FYERS"
    ↓
[Redirect to FYERS Login]
    ↓
[Backend receives auth code]
    ↓
[Exchange for access token]
    ↓
[Store JWT + broker token]
    ↓
[Dashboard loads with live data]
```

### Implementation Steps

#### Step 1: Register with FYERS

1. Go to [FYERS Developer Portal](https://api.fyers.in/)
2. Create account and register your application
3. Get:
   - **Client ID**
   - **Client Secret**
   - **Redirect URI**: `https://yourdomain.com/api/auth/fyers/callback`

#### Step 2: Update Environment Variables

```env
# .env.local
FYERS_CLIENT_ID=your_client_id_here
FYERS_SECRET=your_client_secret_here
FYERS_REDIRECT_URI=https://yourdomain.com/api/auth/fyers/callback
JWT_SECRET=your_super_secret_key_change_this
```

#### Step 3: Create FYERS Authentication Route

Create `server/routes/fyers-auth.js`:

```javascript
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Step 1: Redirect user to FYERS login
router.get('/login', (req, res) => {
  const clientId = process.env.FYERS_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.FYERS_REDIRECT_URI);
  const fyersAuthUrl = `https://api.fyers.in/api/v3/generate-authcode?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=secure_random_string`;
  res.redirect(fyersAuthUrl);
});

// Step 2: Handle OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect('http://localhost:3000?error=no_auth_code');
  }

  try {
    // Exchange auth code for access token
    const tokenResponse = await axios.post('https://api.fyers.in/api/v3/token', {
      code,
      client_id: process.env.FYERS_CLIENT_ID,
      client_secret: process.env.FYERS_SECRET,
      redirect_uri: process.env.FYERS_REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token, user_id } = tokenResponse.data;

    // Create JWT for your app
    const appToken = jwt.sign(
      { user_id, broker: 'fyers', access_token },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to dashboard with token
    res.redirect(`http://localhost:3000?session_token=${appToken}&type=live`);
  } catch (error) {
    console.error('FYERS auth error:', error);
    res.redirect('http://localhost:3000?error=auth_failed');
  }
});

module.exports = router;
```

#### Step 4: Update Main Server

In `server/index.js`:

```javascript
const fyersAuthRoutes = require('./routes/fyers-auth');

// Add routes
app.use('/api/auth/fyers', fyersAuthRoutes);

// Add middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected endpoints
app.get('/api/trading/stats', authenticateToken, (req, res) => {
  // Fetch real data from FYERS API using req.user.access_token
  // ...
});
```

#### Step 5: Update Frontend Onboarding

In `src/components/Onboarding.jsx`:

```javascript
const handleFyersConnect = () => {
  // Redirect to your backend auth flow
  window.location.href = 'http://localhost:5000/api/auth/fyers/login';
};
```

### Testing FYERS Integration

1. Click "Connect FYERS Account" button
2. You'll be redirected to FYERS login page
3. Enter your FYERS credentials
4. You'll be redirected back to dashboard with live connection
5. Verify real data displays in widgets

---

## 🚀 Phase 3: Deploy to Production

### Frontend Deployment (Vercel)

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd src
vercel

# Follow prompts
# - Project name: axivorax-frontend
# - Framework: Vite
# - Output directory: dist
```

**Add Environment Variables in Vercel Dashboard:**
```
VITE_API_URL=https://axivorax-api.herokuapp.com
VITE_FYERS_CLIENT_ID=your_client_id
```

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
cd src
npm run build
netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway)

#### Step 1: Create Railway Account
- Go to [Railway.app](https://railway.app)
- Sign up with GitHub

#### Step 2: Connect Repository
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Authorize Railway to access your repo
4. Select `axivorax-website` repository

#### Step 3: Configure Environment
1. Add environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   FYERS_CLIENT_ID=your_production_client_id
   FYERS_SECRET=your_production_secret
   JWT_SECRET=your_production_secret_key
   ```

#### Step 4: Deploy
- Railway auto-deploys on git push
- Get your backend URL: `https://axivorax-api-railway.app`

### Update Frontend for Production

Update `src/components/Onboarding.jsx`:

```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const handleFyersConnect = () => {
  window.location.href = `${API_URL}/api/auth/fyers/login`;
};
```

### DNS & Custom Domain

1. **For Vercel:**
   - Go to Project Settings → Domains
   - Add `axivorax.com`
   - Update DNS records at your registrar

2. **For Railway:**
   - Custom domain added in project settings
   - Update production redirect URIs with new domain

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database migrations run (if using Supabase)
- [ ] CORS origins updated for production domain
- [ ] API endpoints tested in Postman
- [ ] Frontend build tested locally (`npm run build`)
- [ ] Security: JWT secrets changed
- [ ] Error handling and logging verified

### Post-Deployment
- [ ] Health check endpoint responding
- [ ] Authentication flow working
- [ ] API calls returning live data
- [ ] Dashboard widgets displaying correctly
- [ ] Mobile responsiveness verified
- [ ] Performance monitoring enabled
- [ ] SSL certificate verified
- [ ] CORS headers correct

---

## 🔐 Security Best Practices for Production

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// Input validation
const { body, validationResult } = require('express-validator');
app.post('/api/auth/connect', 
  body('type').isIn(['sandbox', 'live']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

---

## 📊 Monitoring & Analytics

### Add Error Tracking
```bash
npm install sentry-node
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### Add Performance Monitoring
- Vercel Analytics (automatic)
- New Relic for backend monitoring
- Datadog for logs and traces

---

## 🎯 Summary

| Phase | Timeline | Components |
|-------|----------|-----------|
| **1. Local Testing** | Day 1 | Dev servers, mock data |
| **2. FYERS Integration** | Days 2-3 | OAuth2, live auth, real data |
| **3. Production Deploy** | Day 4 | Vercel + Railway |

Your AxivoraX platform will be **live and trading-ready** within days! 🚀

---

## 📞 Support Resources

- **FYERS API**: https://api.fyers.in/
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/

**Next Step:** Choose Phase 1 or 2 based on your timeline and requirements!