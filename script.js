import { askJarvis } from "./ai.js";

// ELEMENTS
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const output = document.getElementById("output");

// SPEAK FUNCTION
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

// SEND MESSAGE TO AI
async function sendMessage(textOverride) {
  const text = (textOverride || inputBox.value).trim();
  if (!text) return;

  output.innerText = "Jarvis is thinking...";

  try {
    const response = await askJarvis(text);

    output.innerText = `You: ${text}\n\nJarvis: ${response}`;

    speak(response);
  } catch (err) {
    output.innerText = "Error connecting to AI.";
    console.error(err);
  }

  inputBox.value = "";
}

// BUTTON
sendBtn.addEventListener("click", () => sendMessage());

// ENTER KEY
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// VOICE INPUT
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";

voiceBtn.addEventListener("click", () => {
  output.innerText = "Listening...";
  recognition.start();
});

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  sendMessage(voiceText);
};

recognition.onerror = () => {
  output.innerText = "Voice error.";
};
