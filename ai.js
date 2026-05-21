export async function askJarvis(message) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk-or-v1-a96...f65
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are DRILLIONS JARVIS. You are a futuristic AI assistant. Keep responses short, clear, and slightly robotic."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
