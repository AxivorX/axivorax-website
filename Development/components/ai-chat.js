(() => {
    "use strict";

    const ENDPOINT = "/demo/analyze";
    const TIMEOUT_MS = 15000;

    function $(id) {
        return document.getElementById(id);
    }

    function addMessage(role, text) {
        const messages = $("ax01-messages");
        if (!messages) return;

        const item = document.createElement("div");
        item.className = `ax01-message ax01-message-${role}`;

        const label = document.createElement("div");
        label.className = "ax01-message-label";
        label.textContent = role === "user" ? "YOU" : "AX-01";

        const body = document.createElement("div");
        body.className = "ax01-message-body";
        body.textContent = String(text ?? "");

        item.append(label, body);
        messages.appendChild(item);

        messages.scrollTop = messages.scrollHeight;
    }

    function setStatus(text, state) {
        const status = $("ax01-status");
        if (!status) return;

        status.textContent = text;
        status.dataset.state = state || "";
    }

    function setBusy(busy) {
        const input = $("ax01-input");
        const send = $("ax01-send");

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

    function openAX01() {
        const popup = $("ax01-popup");
        const float = $("ax01-float");
        const input = $("ax01-input");

        if (!popup) return;

        popup.classList.add("open");
        popup.setAttribute("aria-hidden", "false");

        if (float) float.setAttribute("aria-expanded", "true");

        setTimeout(() => input?.focus(), 100);
    }

    function closeAX01() {
        const popup = $("ax01-popup");
        const float = $("ax01-float");

        if (!popup) return;

        popup.classList.remove("open");
        popup.setAttribute("aria-hidden", "true");

        if (float) float.setAttribute("aria-expanded", "false");
    }

    function clearAX01() {
        const messages = $("ax01-messages");
        if (!messages) return;

        messages.replaceChildren();

        addMessage(
            "assistant",
            "Hello. I'm AX-01. How can I help?"
        );
    }

    async function sendAX01(message) {
        const controller = new AbortController();

        const timeout = setTimeout(
            () => controller.abort(),
            TIMEOUT_MS
        );

        try {
            const response = await fetch(ENDPOINT, {
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

            return (
                result?.data?.result ??
                result?.result ??
                "AX-01 returned an empty response."
            );

        } finally {
            clearTimeout(timeout);
        }
    }

    async function submitAX01(event) {
        event.preventDefault();

        const input = $("ax01-input");
        if (!input || input.disabled) return;

        const message = input.value.trim();

        if (!message) {
            input.focus();
            return;
        }

        addMessage("user", message);
        input.value = "";

        setBusy(true);

        try {
            const answer = await sendAX01(message);
            addMessage("assistant", answer);

        } catch (error) {
            const text =
                error?.name === "AbortError"
                    ? "AX-01 timed out. Please try again."
                    : "AX-01 could not connect to the AI server.";

            addMessage("assistant", text);
            setStatus("● ERROR", "error");

        } finally {
            setBusy(false);
            input.focus();
        }
    }

    function initAX01() {
        const float = $("ax01-float");
        const close = $("ax01-close");
        const clear = $("ax01-clear");
        const form = $("ax01-form");
        const input = $("ax01-input");

        if (!float || !close || !clear || !form || !input) {
            console.warn("AX-01 widget markup not found.");
            return;
        }

        float.addEventListener("click", openAX01);
        close.addEventListener("click", closeAX01);
        clear.addEventListener("click", clearAX01);
        form.addEventListener("submit", submitAX01);

        input.addEventListener("keydown", event => {
            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {
                event.preventDefault();
                form.requestSubmit();
            }
        });

        addMessage(
            "assistant",
            "Hello. I'm AX-01. How can I help?"
        );
    }

    window.toggleAX01 = () => {
        const popup = $("ax01-popup");

        if (popup?.classList.contains("open")) {
            closeAX01();
        } else {
            openAX01();
        }
    };

    document.addEventListener(
        "DOMContentLoaded",
        initAX01
    );
})();
