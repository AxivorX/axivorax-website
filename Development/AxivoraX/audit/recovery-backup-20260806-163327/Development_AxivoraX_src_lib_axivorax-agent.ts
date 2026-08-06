export async function askAxivoraX(
  user_id: number,
  message: string
) {

  const response = await fetch(
    "http://127.0.0.1:8000/api/agent",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        user_id,
        message
      })
    }
  );


  if (!response.ok) {

    throw new Error(
      "AxivoraX Agent connection failed"
    );

  }


  return await response.json();

}
