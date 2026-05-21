const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const output = document.getElementById("output");

// SAFE SPEECH
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

// SAFE BRAIN (NO AI YET)
function jarvisResponse(text) {
  text = text.toLowerCase();

  if (text.includes("hello")) return "Hello.";
  if (text.includes("status")) return "All systems operational.";
  if (text.includes("youtube")) {
    window.open("https://youtube.com", "_blank");
    return "Opening YouTube.";
  }

  return "Command received.";
}

// SEND
function sendMessage(textOverride) {
  const text = (textOverride || inputBox.value).trim();
  if (!text) return;

  const response = jarvisResponse(text);

  output.innerText = `You: ${text}\nJarvis: ${response}`;

  speak(response);

  inputBox.value = "";
}

// BUTTON
sendBtn.addEventListener("click", sendMessage);

// ENTER KEY
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// VOICE FIX
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
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
} else {
  voiceBtn.onclick = () => {
    output.innerText = "Voice not supported in this browser.";
  };
}
