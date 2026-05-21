import { askJarvis } from "./ai.js";

const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");
const statusText = document.getElementById("status");
const orb = document.querySelector(".orb");

// ------------------------
// SPEAK
// ------------------------
function speak(text) {

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;

  speech.onstart = () => {
    statusText.innerText = "JARVIS SPEAKING...";
    orb.style.boxShadow =
      "0 0 120px rgba(255,255,255,0.6)";
  };

  speech.onend = () => {
    statusText.innerText = "AWAITING COMMAND...";
    orb.style.boxShadow =
      "0 0 40px rgba(255,255,255,0.15)";
  };

  window.speechSynthesis.speak(speech);
}

// ------------------------
// SEND TO AI
// ------------------------
async function sendMessage(messageOverride) {

  const text =
    (messageOverride || inputBox.value).trim();

  if (!text) return;

  output.innerText =
    `You: ${text}\n\nJarvis is thinking...`;

  statusText.innerText = "PROCESSING...";

  orb.style.boxShadow =
    "0 0 100px rgba(255,255,255,0.45)";

  try {

    const response = await askJarvis(text);

    output.innerText =
      `You: ${text}\n\nJarvis: ${response}`;

    speak(response);

  } catch (err) {

    console.error(err);

    output.innerText =
      "AI connection failed.";

    statusText.innerText =
      "SYSTEM ERROR";
  }

  inputBox.value = "";
}

// ------------------------
// BUTTON
// ------------------------
sendBtn.addEventListener("click", () => {
  sendMessage();
});

// ------------------------
// ENTER KEY
// ------------------------
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ------------------------
// ALWAYS LISTENING MODE
// ------------------------
const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;

  recognition.interimResults = false;

  recognition.lang = "en-US";

  recognition.onstart = () => {
    statusText.innerText =
      "VOICE SYSTEM ACTIVE";
  };

  recognition.onresult = async (event) => {

    const transcript =
      event.results[event.results.length - 1][0]
      .transcript
      .toLowerCase();

    console.log("Heard:", transcript);

    // WAKE WORD
    if (transcript.includes("hey jarvis")) {

      output.innerText =
        "Wake word detected.";

      speak("Yes?");

      // remove wake word
      const cleaned =
        transcript.replace("hey jarvis", "").trim();

      // if user spoke command too
      if (cleaned.length > 0) {

        setTimeout(() => {
          sendMessage(cleaned);
        }, 1200);
      }
    }
  };

  recognition.onerror = (event) => {

    console.log(event.error);

    statusText.innerText =
      "VOICE ERROR";
  };

  recognition.onend = () => {

    // restart automatically
    recognition.start();
  };

  recognition.start();

} else {

  statusText.innerText =
    "VOICE NOT SUPPORTED";
}
