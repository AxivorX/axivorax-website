const AX01_ENDPOINT = "/demo/analyze";

const AX01 = {
    input: null,
    output: null,
    button: null,
    status: null,
    busy: false,
    messages: []
};


function initAX01Chat() {
    AX01.input = document.getElementById("ai-message");
    AX01.output = document.getElementById("ai-response");
    AX01.status = document.getElementById("ax01-chat-status");

    if (!AX01.input || !AX01.output) {
        console.warn("AX-01 chat elements not found.");
        return;
    }

    AX01.button =
        document.querySelector("#ax01-chat .ax01-send") ||
        document.querySelector("#ax01-chat button");

    AX01.input.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendAIMessage();
        }
    });

    setAX01Response(
        "AX-01 ready. Ask me about your trading process, risk, performance or decision quality.",
        "empty"
    );
}


function setAX01Response(message, state = "") {
    if (!AX01.output) return;

    AX01.output.className =
        `ax01-response ${state}`.trim();

    AX01.output.textContent = message;
    AX01.output.scrollTop = AX01.output.scrollHeight;
}


function updateAX01Status(text, state = "") {
    if (!AX01.status) return;

    AX01.status.textContent = text;
    AX01.status.className =
        `ax01-chat-status ${state}`.trim();
}


function setAX01Loading(loading) {
    AX01.busy = loading;

    if (AX01.input) {
        AX01.input.disabled = loading;
    }

    if (AX01.button) {
        AX01.button.disabled = loading;
        AX01.button.textContent =
            loading ? "Analyzing…" : "Ask AX-01";
    }
}


function addAX01Message(role, content) {
    AX01.messages.push({
        role,
        content,
        timestamp: new Date()
    });

    renderAX01Conversation();
}


function renderAX01Conversation() {
    if (!AX01.output) return;

    if (!AX01.messages.length) {
        setAX01Response(
            "AX-01 ready. Start a conversation.",
            "empty"
        );
        return;
    }

    AX01.output.textContent = AX01.messages
        .map(message => {
            const label =
                message.role === "user"
                    ? "YOU"
                    : "AX-01";

            const time =
                message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                });

            return `[${time}] ${label}\n${message.content}`;
        })
        .join("\n\n");

    AX01.output.scrollTop =
        AX01.output.scrollHeight;
}


async function askAxivoraX(message) {
    const response = await fetch(AX01_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            user_id: 0
        })
    });

    let payload;

    try {
        payload = await response.json();
    } catch {
        throw new Error(
            "AX-01 returned an invalid response."
        );
    }

    if (!response.ok) {
        const detail =
            payload?.detail ||
            payload?.error ||
            "AX-01 request failed.";

        throw new Error(detail);
    }

    return payload;
}


async function sendAIMessage() {
    if (AX01.busy) return;

    if (!AX01.input || !AX01.output) {
        initAX01Chat();
    }

    const message =
        AX01.input?.value.trim();

    if (!message) {
        setAX01Response(
            "Tell AX-01 what you want to analyze.",
            "error"
        );

        AX01.input?.focus();
        return;
    }

    addAX01Message("user", message);

    AX01.input.value = "";

    setAX01Loading(true);
    updateAX01Status("● ANALYZING", "loading");

    try {
        const result =
            await askAxivoraX(message);

        const analysis =
            result?.data?.result ||
            result?.result;

        if (!analysis) {
            throw new Error(
                "AX-01 returned no analysis."
            );
        }

        addAX01Message("assistant", analysis);

        updateAX01Status(
            "● ONLINE",
            "online"
        );

    } catch (error) {
        console.error(
            "AX-01 error:",
            error
        );

        addAX01Message(
            "assistant",
            `Connection error: ${error.message}`
        );

        updateAX01Status(
            "● CONNECTION ERROR",
            "error"
        );

    } finally {
        setAX01Loading(false);
        AX01.input?.focus();
    }
}


function clearAX01Chat() {
    AX01.messages = [];

    setAX01Response(
        "AX-01 ready. Start a new conversation.",
        "empty"
    );

    updateAX01Status(
        "● ONLINE",
        "online"
    );

    AX01.input?.focus();
}


window.askAxivoraX = askAxivoraX;
window.sendAIMessage = sendAIMessage;
window.initAX01Chat = initAX01Chat;
window.clearAX01Chat = clearAX01Chat;


if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initAX01Chat
    );
} else {
    initAX01Chat();
}
