import { askJarvis } from "./ai.js";
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const output = document.getElementById("output");
const orb = document.querySelector(".orb");

// -----------------------------
// JARVIS BRAIN (simple logic)
// -----------------------------
function jarvisResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) {
    return "Hello. Systems online.";
  }

  if (input.includes("who are you")) {
    return "I am Drillions Jarvis. Your assistant system.";
  }

  if (input.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    return "Opening YouTube.";
  }

  if (input.includes("open google")) {
    window.open("https://google.com", "_blank");
    return "Opening Google.";
  }

  if (input.includes("status")) {
    return "All systems stable.";
  }

  return "Command not recognized.";
}

// -----------------------------
// TEXT TO SPEECH (Jarvis talks)
// -----------------------------
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}

// -----------------------------
// MAIN SEND FUNCTION
// -----------------------------
async function sendMessage(textOverride) {
  const text = (textOverride || inputBox.value).trim();
  if (!text) return;

  output.innerText = "Jarvis is thinking...";

  const response = await askJarvis(text);

  output.innerText = `You: ${text}\nJarvis: ${response}`;

  speak(response);

  inputBox.value = "";
}

// -----------------------------
// BUTTON INPUT
// -----------------------------
sendBtn.addEventListener("click", () => sendMessage());

// ENTER KEY
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// -----------------------------
// VOICE RECOGNITION ENGINE
// -----------------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;

voiceBtn.addEventListener("click", () => {
  output.innerText = "Listening...";
  recognition.start();
});

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  sendMessage(voiceText);
};

recognition.onerror = () => {
  output.innerText = "Voice error. Try again.";
};
