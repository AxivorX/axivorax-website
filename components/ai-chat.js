async function askAxivoraX(message) {

    const response = await fetch(
        "http://127.0.0.1:8000/api/agent",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                user_id: 1,
                message: message
            })
        }
    );


    if (!response.ok) {

        throw new Error(
            "AxivoraX AI connection failed"
        );

    }


    return await response.json();

}


async function sendAIMessage() {

    const input =
        document.getElementById(
            "ai-message"
        );


    const output =
        document.getElementById(
            "ai-response"
        );


    output.innerHTML =
        "Thinking...";


    try {

        const result =
            await askAxivoraX(
                input.value
            );


        output.innerHTML =
            JSON.stringify(
                result,
                null,
                2
            );


    } catch(error) {

        output.innerHTML =
            "AI Agent is offline";

    }

}
