const AX01_ENDPOINT = "/demo/analyze";
const AX01_TIMEOUT_MS = 30000;

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

    AX01.input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendAIMessage();
        }
    });

    createQuickPrompts();
    renderAX01EmptyState();
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


function createQuickPrompts() {
    const chat = document.getElementById("ax01-chat");

    if (!chat || chat.querySelector(".ax01-quick-prompts")) {
        return;
    }

    const prompts = [
        "Evaluate a bullish breakout setup",
        "Review my trading risk",
        "Analyze this market scenario",
        "Help me avoid an emotional trade"
    ];

    const container = document.createElement("div");
    container.className = "ax01-quick-prompts";
    container.setAttribute("aria-label", "AX-01 quick prompts");

    prompts.forEach(prompt => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "ax01-prompt";
        button.textContent = prompt;

        button.addEventListener("click", () => {
            if (AX01.busy || !AX01.input) return;

            AX01.input.value = prompt;
            AX01.input.focus();
        });

        container.appendChild(button);
    });

    const input = chat.querySelector("#ai-message");

    if (input) {
        input.parentNode.insertBefore(container, input);
    }
}


function renderAX01EmptyState() {
    if (!AX01.output) return;

    AX01.output.replaceChildren();

    const message = document.createElement("div");
    message.className = "ax01-empty-state";

    const title = document.createElement("strong");
    title.textContent = "AX-01 ready";

    const text = document.createElement("span");
    text.textContent =
        " Ask about risk, market context, trading psychology, or decision quality.";

    message.append(title, text);
    AX01.output.appendChild(message);

    AX01.output.className =
        "ax01-response empty";
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

    AX01.output.replaceChildren();

    AX01.messages.forEach(message => {
        const bubble = document.createElement("article");

        bubble.className =
            `ax01-message ${message.role}`;

        const header = document.createElement("div");
        header.className = "ax01-message-header";

        const label = document.createElement("strong");
        label.textContent =
            message.role === "user"
                ? "YOU"
                : "AX-01";

        const time = document.createElement("time");
        time.dateTime =
            message.timestamp.toISOString();

        time.textContent =
            message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

        header.append(label, time);

        const body = document.createElement("div");
        body.className = "ax01-message-body";

        if (message.role === "assistant") {
            renderStructuredAnalysis(
                body,
                message.content
            );
        } else {
            body.textContent = message.content;
        }

        bubble.append(header, body);
        AX01.output.appendChild(bubble);
    });

    AX01.output.className =
        "ax01-response success";

    AX01.output.scrollTop =
        AX01.output.scrollHeight;
}


function renderStructuredAnalysis(container, content) {
    const lines =
        String(content)
            .replace(/\r/g, "")
            .split("\n");

    let currentSection = null;

    lines.forEach(rawLine => {
        const line = rawLine.trim();

        if (!line) return;

        if (
            /^AX-01 Analysis$/i.test(line) ||
            /^AX-01 status:/i.test(line)
        ) {
            const heading =
                document.createElement("div");

            heading.className =
                "ax01-analysis-title";

            heading.textContent = line;

            container.appendChild(heading);
            return;
        }

        const sectionMatch =
            line.match(/^([^:]{2,45}):\s*(.*)$/);

        if (sectionMatch) {
            const section =
                document.createElement("section");

            section.className =
                "ax01-analysis-section";

            const heading =
                document.createElement("strong");

            heading.textContent =
                sectionMatch[1].trim();

            const text =
                document.createElement("p");

            text.textContent =
                sectionMatch[2].trim();

            section.append(heading, text);
            container.appendChild(section);

            currentSection = section;
            return;
        }

        if (currentSection) {
            const extra =
                document.createElement("p");

            extra.className =
                "ax01-analysis-extra";

            extra.textContent = line;

            currentSection.appendChild(extra);
        } else {
            const paragraph =
                document.createElement("p");

            paragraph.textContent = line;

            container.appendChild(paragraph);
        }
    });
}


async function askAxivoraX(message) {
    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () => controller.abort(),
            AX01_TIMEOUT_MS
        );

    let response;

    try {
        response = await fetch(
            AX01_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    user_id: 0
                }),
                signal: controller.signal
            }
        );
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error(
                "AX-01 timed out after 30 seconds."
            );
        }

        throw new Error(
            "Unable to reach the AX-01 analysis service."
        );
    } finally {
        clearTimeout(timeout);
    }

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
            payload?.message ||
            "AX-01 request failed.";

        throw new Error(
            typeof detail === "string"
                ? detail
                : "AX-01 request failed."
        );
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
        updateAX01Status(
            "● READY",
            "online"
        );

        if (AX01.output) {
            AX01.output.replaceChildren();

            const error =
                document.createElement("div");

            error.className =
                "ax01-inline-error";

            error.textContent =
                "Tell AX-01 what you want to analyze.";

            AX01.output.appendChild(error);
            AX01.output.className =
                "ax01-response error";
        }

        AX01.input?.focus();
        return;
    }

    addAX01Message(
        "user",
        message
    );

    AX01.input.value = "";

    setAX01Loading(true);

    updateAX01Status(
        "● ANALYZING",
        "loading"
    );

    try {
        const result =
            await askAxivoraX(message);

        const analysis =
            result?.data?.result ||
            result?.result;

        if (
            typeof analysis !== "string" ||
            !analysis.trim()
        ) {
            throw new Error(
                "AX-01 returned no analysis."
            );
        }

        addAX01Message(
            "assistant",
            analysis
        );

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

    renderAX01EmptyState();

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
