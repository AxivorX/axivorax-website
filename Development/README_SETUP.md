# AxivoraX - Trading Performance Intelligence Platform

Welcome to AxivoraX, an institutional-grade fintech trading dashboard powered by AI Command Center technology.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application entry point
├── App.css                 # Dashboard styling
├── index.css               # Global styles
├── main.jsx                # React DOM entry point
└── components/
    ├── Onboarding.jsx      # Login/broker connection screen
    ├── Onboarding.css      # Onboarding styling
    ├── AICommandCenter.jsx  # AI insights widget
    └── AICommandCenter.css  # AI widget styling
```

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
REACT_APP_FYERS_CLIENT_ID=your_fyers_client_id
REACT_APP_FYERS_REDIRECT_URI=https://yourdomain.com/auth/callback
```

## 🎨 Features

- **Onboarding Flow**: Direct FYERS OAuth2 integration or sandbox mode
- **AI Command Center**: Real-time market analysis and trading insights
- **Glassmorphic UI**: Modern dark theme with blur effects
- **Responsive Design**: Mobile and desktop support
- **Session Management**: Track user authentication state

## 📦 Dependencies

- **React 18.2.0** - UI framework
- **Vite 4.4.0** - Build tool
- **ESLint 8.48.0** - Code linting

## 🛠️ Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Rotate Supabase keys regularly
- Use environment variables for all sensitive data
- Enable row-level security (RLS) in Supabase

## 📄 License

Copyright © 2026 AxivoraX. All rights reserved.

## 📞 Support

For issues and feature requests, please visit our GitHub repository.