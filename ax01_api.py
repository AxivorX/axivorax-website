from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AxivoraX AX-01 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AgentRequest(BaseModel):
    message: str
    user_id: int | None = None


def analyze_message(message: str) -> str:
    message = message.strip()

    if not message:
        return (
            "Please provide a ticker, trade setup, or market scenario "
            "for AX-01 to analyze."
        )

    return (
        "AX-01 Analysis\n\n"
        f"Input received: {message}\n\n"
        "Contextual Analysis: Define the current trend, consolidation "
        "range, support/resistance and volatility before entering.\n\n"
        "Risk Parameters: Establish the invalidation level first. "
        "Do not size a position until the maximum acceptable loss is known.\n\n"
        "Expectancy: Compare realistic reward against risk and account "
        "for fees, slippage and the probability of the setup succeeding.\n\n"
        "Psychological Audit: Confirm that the trade follows your "
        "predefined rules rather than impulse, FOMO or revenge trading.\n\n"
        "AX-01 status: Local analysis engine operational."
    )


@app.get("/")
async def root():
    return {
        "status": "online",
        "agent": "AX-01",
        "mode": "local"
    }


@app.get("/feature")
async def feature():
    return {
        "status": "success",
        "message": (
            "AxivoraX AX-01 Trading Intelligence Agent is online. "
            "Provide a ticker or market scenario for analysis."
        )
    }


@app.post("/demo/analyze")
async def demo_analyze(request: AgentRequest):
    return {
        "success": True,
        "data": {
            "result": analyze_message(request.message)
        }
    }


@app.post("/api/agent")
async def agent(request: AgentRequest):
    return {
        "success": True,
        "data": {
            "result": analyze_message(request.message)
        }
    }
