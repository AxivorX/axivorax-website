export async function askAxivoraX(
  user_id: number,
  message: string
) {

  const response = await fetch(
    "/api/agent",
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
