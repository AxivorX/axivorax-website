(() => {
    "use strict";

    const AX01_ENDPOINT = "/demo/analyze";
    const AX01_TIMEOUT = 15000;

    function escapeText(value) {
        return String(value ?? "");
    }

    function formatResponse(text) {
        return escapeText(text)
            .replace(/\r\n/g, "\n")
            .replace(/\\n/g, "\n")
            .trim();
    }

    function getElements() {
        return {
            popup: document.getElementById("ax01-popup"),
            messages: document.getElementById("ax01-messages"),
            input: document.getElementById("ax01-input"),
            send: document.getElementById("ax01-send"),
            status: document.getElementById("ax01-status")
        };
    }

    function addMessage(role, text) {
        const { messages } = getElements();
        if (!messages) return;

        const item = document.createElement("div");
        item.className = `ax01-message ${role}`;

        const label = document.createElement("div");
        label.className = "ax01-message-label";
        label.textContent = role === "user" ? "YOU" : "AX-01";

        const body = document.createElement("div");
        body.className = "ax01-message-body";
        body.textContent = formatResponse(text);

        item.append(label, body);
        messages.appendChild(item);

        messages.scrollTop = messages.scrollHeight;
    }

    function setStatus(text, state = "") {
        const { status } = getElements();
        if (!status) return;

        status.textContent = text;
        status.dataset.state = state;
    }

    function setBusy(busy) {
        const { input, send } = getElements();

        if (input) input.disabled = busy;
        if (send) {
            send.disabled = busy;
            send.textContent = busy ? "Analyzing…" : "Send";
        }

        setStatus(
            busy ? "● ANALYZING" : "● ONLINE",
            busy ? "busy" : "online"
        );
    }

    async function sendAIMessage() {
        const { input } = getElements();

        if (!input || input.disabled) return;

        const message = input.value.trim();

        if (!message) {
            input.focus();
            return;
        }

        addMessage("user", message);
        input.value = "";
        setBusy(true);

        const controller = new AbortController();
        const timeout = setTimeout(
            () => controller.abort(),
            AX01_TIMEOUT
        );

        try {
            const response = await fetch(AX01_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    user_id: 0
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();

            const answer =
                result?.data?.result ??
                result?.result ??
                "AX-01 returned no response.";

            addMessage("assistant", answer);

        } catch (error) {
            const message =
                error?.name === "AbortError"
                    ? "AX-01 request timed out. Please try again."
                    : "AX-01 connection error. Please check the AI server.";

            addMessage("assistant", message);
            setStatus("● ERROR", "error");

        } finally {
            clearTimeout(timeout);
            setBusy(false);
            input.focus();
        }
    }

    function toggleAX01() {
        const { popup, input } = getElements();
        if (!popup) return;

        const open = popup.classList.toggle("open");
        popup.setAttribute("aria-hidden", String(!open));

        if (open && input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    function clearAX01Chat() {
        const { messages } = getElements();
        if (!messages) return;

        messages.replaceChildren();

        addMessage(
            "assistant",
            "Hello. I'm AX-01. How can I help?"
        );
    }

    function initAX01() {
        const { input, send } = getElements();

        if (!input || !send) return;

        send.addEventListener("click", sendAIMessage);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendAIMessage();
            }
        });

        addMessage(
            "assistant",
            "Hello. I'm AX-01. How can I help?"
        );
    }

    window.sendAIMessage = sendAIMessage;
    window.toggleAX01 = toggleAX01;
    window.clearAX01Chat = clearAX01Chat;

    document.addEventListener("DOMContentLoaded", initAX01);
})();
