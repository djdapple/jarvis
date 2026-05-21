export async function askJarvis(message) {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Authorization": "Bearer sk-or-v1-a96.f65
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "system",

            content:
              "You are DRILLIONS JARVIS, a futuristic AI assistant. Speak clearly, intelligently, and slightly robotic. Keep responses concise."
          },

          {
            role: "user",
            content: message
          }

        ]
      })
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}
