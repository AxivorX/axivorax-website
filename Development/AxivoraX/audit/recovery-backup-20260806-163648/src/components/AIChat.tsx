"use client";

import { useState } from "react";
import { askAxivoraX } from "@/lib/axivorax-agent";


export default function AIChat() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");


  async function sendMessage() {

    try {

      const result = await askAxivoraX(
        1,
        message
      );

      setResponse(
        JSON.stringify(
          result,
          null,
          2
        )
      );

    } catch (error) {

      setResponse(
        "AI Agent connection failed"
      );

    }

  }


  return (
    <div>

      <h2>
        AxivoraX AI Assistant
      </h2>

      <textarea
        value={message}
        onChange={
          (e) => setMessage(e.target.value)
        }
        placeholder="Ask AxivoraX..."
      />

      <button
        onClick={sendMessage}
      >
        Send
      </button>


      <pre>
        {response}
      </pre>

    </div>
  );
}
