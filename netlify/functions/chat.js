export async function handler(event) {
  try {
    const { messages } = JSON.parse(event.body);

    const models = [
      "mistralai/mistral-7b-instruct",
      "meta-llama/llama-3-8b-instruct",
      "google/gemma-7b-it"
    ];

    let lastError = null;

    for (const model of models) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages
          })
        });

        const data = await res.json();

        if (!data.error) {
          return {
            statusCode: 200,
            body: JSON.stringify(data)
          };
        }

        lastError = data;

      } catch (err) {
        lastError = err;
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Todos os modelos falharam",
        detail: lastError
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
