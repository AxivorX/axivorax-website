async function askAxivoraX(message) {

    const response = await fetch(
        "http://127.0.0.1:8000/demo/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                
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
        "🤖 AX-01 is analyzing...";


    try {

        const result =
            await askAxivoraX(
                input.value
            );


        if (result.data && result.data.result) {

            output.innerHTML =
                result.data.result
                .replace(/\\n/g, "<br>");

        } else {

            output.innerHTML =
                JSON.stringify(result, null, 2);

        }

        input.value = "";


    } catch(error) {

        output.innerHTML =
            "⚠️ AX-01 connection error. Please check the AI server.";

    }

}
