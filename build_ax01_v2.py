from pathlib import Path

Path("index.html").write_text(r'''
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AxivoraX | AI Powered Trading Intelligence</title>
<meta name="description" content="AxivoraX AI trading intelligence platform with AI coaching, risk insights and performance analysis.">
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
</nav>
<div>
<a class="login">Login</a>
<a class="button">Join Waitlist</a>
</div>
</header>


<section class="hero">

<div class="content">

<div class="badge">
✦ AI Powered Trading Intelligence
</div>

<h1>
Trade Smarter.<br>
Analyze Deeper.<br>
Perform Better.
</h1>

<p>
AX-01 helps traders understand behaviour, analyse risk and improve their trading process through AI intelligence.
</p>

<div>
<a class="button">Start Your Journey</a>
<a class="button dark">Watch Demo</a>
</div>

</div>


<div class="ai-interface">

<div class="dashboard">

<div class="top">
AX-01 Intelligence System
<span>● Active</span>
</div>


<div class="graph">
<div></div>
</div>


<div class="cards">

<div>
Risk Analysis
<strong>Balanced</strong>
</div>

<div>
Trading Behaviour
<strong>Learning</strong>
</div>

<div>
AI Insights
<strong>Ready</strong>
</div>

</div>


<div class="assistant">
🤖 AX-01 AI Coach
<br>
Analysing trading patterns...
</div>


</div>

</div>

</section>



<section>
<h2>Trading Intelligence Engine</h2>

<div class="features">

<div>AI Trade Journal</div>
<div>Performance Analytics</div>
<div>Risk Intelligence</div>
<div>Broker Connectivity</div>

</div>

</section>



<section>
<h2>How It Works</h2>
<p>
Connect → Import Trades → AI Analysis → Improve
</p>
</section>


<footer>
<h2>AxivoraX</h2>
<p>
AI coaching and trading intelligence. Human decisions remain in control.
</p>
</footer>


</body>
</html>
''')


Path("style.css").write_text(r'''
*{
box-sizing:border-box;
font-family:Inter,Arial,sans-serif;
}

body{
margin:0;
background:#030612;
color:white;
overflow-x:hidden;
}


.ai-bg{
position:fixed;
inset:0;
background:
radial-gradient(circle at 75% 35%,#5728ff55,transparent 30%),
radial-gradient(circle at 20% 20%,#0077ff33,transparent 35%),
linear-gradient(#030612,#050818);
z-index:-1;
}


.ai-bg:after{
content:"";
position:absolute;
inset:0;
background-image:
linear-gradient(#ffffff08 1px,transparent 1px),
linear-gradient(90deg,#ffffff08 1px,transparent 1px);
background-size:60px 60px;
opacity:.15;
}


header{
height:90px;
padding:0 8%;
display:flex;
align-items:center;
justify-content:space-between;
}


.logo{
font-size:30px;
font-weight:800;
}


nav a{
margin:20px;
color:#aab2d0;
}


.button{
display:inline-block;
padding:14px 28px;
border-radius:30px;
background:linear-gradient(135deg,#7b2cff,#009dff);
color:white;
text-decoration:none;
}


.dark{
background:#151b35;
}


.hero{
min-height:85vh;
padding:5% 8%;
display:flex;
align-items:center;
gap:50px;
}


.content{
width:45%;
}


.badge{
color:#9b7cff;
margin-bottom:20px;
}


h1{
font-size:64px;
line-height:1.05;
}


p{
font-size:18px;
color:#aab2d0;
line-height:1.6;
}


.ai-interface{
width:55%;
}


.dashboard{
padding:30px;
border-radius:30px;
background:rgba(255,255,255,.08);
border:1px solid rgba(255,255,255,.15);
backdrop-filter:blur(25px);
box-shadow:0 0 100px #552cff55;
}


.top{
display:flex;
justify-content:space-between;
}


.top span{
color:#4cff9b;
}


.graph{
height:200px;
margin:25px 0;
border-radius:20px;
background:
linear-gradient(140deg,transparent,#7b2cff55),
linear-gradient(45deg,#009dff55,transparent);
position:relative;
}


.graph div{
height:100%;
background:linear-gradient(140deg,transparent 40%,#00d9ff 41%,transparent 43%);
}


.cards{
display:flex;
gap:15px;
}


.cards div,.features div,.assistant{
background:#10172e;
padding:20px;
border-radius:18px;
}


.cards strong{
display:block;
margin-top:10px;
color:#8ca7ff;
}


.assistant{
margin-top:20px;
box-shadow:0 0 30px #7b2cff55;
}


section{
padding:70px 8%;
text-align:center;
}


.features{
display:flex;
justify-content:center;
gap:20px;
flex-wrap:wrap;
}


footer{
padding:50px;
text-align:center;
}


@media(max-width:900px){

.hero{
flex-direction:column;
}

.content,.ai-interface{
width:100%;
}

h1{
font-size:42px;
}

}
''')

print("AX-01 futuristic landing V2 created")
