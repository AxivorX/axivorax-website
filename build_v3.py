from pathlib import Path

html = r'''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AxivoraX | AI Trading Intelligence</title>
<meta name="description" content="AxivoraX provides AI-powered trading intelligence, performance analysis and risk insights.">
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="ai-bg"></div>

<header>
<div class="logo">AxivoraX</div>
<nav>
<a>Features</a>
<a>How It Works</a>
<a>Pricing</a>
<a>FAQ</a>
</nav>
<div>
<button class="login">Login</button>
<button>Join Waitlist</button>
</div>
</header>

<section class="hero">
<div>
<span class="badge">AI Powered Trading Intelligence</span>
<h1>Trade Smarter.<br>Analyze Deeper.<br>Perform Better.</h1>
<p>
AI coaching, trading performance analysis and risk insights.
AxivoraX helps traders improve decisions while keeping humans in control.
</p>
<button>Join Waitlist</button>
</div>

<div class="dashboard glass">
<h3>AX-01 AI Assistant</h3>
<div class="card">Market Context Analysis</div>
<div class="card">Risk Review</div>
<div class="card">Performance Score</div>
<div class="chart"></div>
</div>
</section>


<section>
<h2>AX-01 AI Agent</h2>
<div class="glass box">
Your intelligent trading companion for journaling, analysis and improvement.
No automatic buy/sell decisions. No guaranteed profits.
</div>
</section>


<section>
<h2>How It Works</h2>
<div class="grid">
<div class="glass">Connect<br>Broker Data</div>
<div class="glass">Import<br>Trades</div>
<div class="glass">AI<br>Analysis</div>
<div class="glass">Improve<br>Your Process</div>
</div>
</section>


<section>
<h2>Trading Intelligence</h2>
<div class="grid">
<div class="glass">AI Trade Journal</div>
<div class="glass">Risk Insights</div>
<div class="glass">Performance Analytics</div>
<div class="glass">Trading Psychology</div>
</div>
</section>


<section>
<h2>Dashboard Preview</h2>
<div class="glass preview">
Portfolio analytics • Trade history • AI insights • Decision review
</div>
</section>


<section>
<h2>Broker Connectivity</h2>
<div class="glass box">
Connect supported brokers and analyze your trading activity securely.
</div>
</section>


<section>
<h2>Demo</h2>
<div class="glass preview">
AX-01 workflow demonstration coming soon.
</div>
</section>


<section>
<h2>Pricing</h2>
<div class="grid">
<div class="glass">Free<br>Limited access</div>
<div class="glass">Pro<br>Coming Soon</div>
</div>
</section>


<section>
<h2>FAQ</h2>
<div class="glass box">
Does AxivoraX make trades?<br>
No. AxivoraX provides analysis and education. The trader remains in control.
</div>
</section>


<footer>
AxivoraX © 2026<br>
AI Trading Intelligence Platform
</footer>


</body>
</html>
'''

Path("index.html").write_text(html)
print("HTML V3 CREATED")
