const inputBox =
  document.getElementById("inputBox");

const sendBtn =
  document.getElementById("sendBtn");

const terminal =
  document.getElementById("terminal");

const statusText =
  document.getElementById("status");

const orb =
  document.querySelector(".orb");

// ----------------------
// TERMINAL WRITER
// ----------------------
function writeTerminal(text) {

  terminal.innerText =
    text + "\n\n" + terminal.innerText;
}

// ----------------------
// JARVIS BRAIN
// ----------------------
function jarvisResponse(text) {

  text = text.toLowerCase();

  if (text.includes("hello")) {
    return "Hello. Systems online.";
  }

  if (text.includes("status")) {
    return "All systems operational.";
  }

  if (text.includes("youtube")) {

    window.open(
      "https://youtube.com",
      "_blank"
    );

    return "Opening YouTube.";
  }

  if (text.includes("google")) {

    window.open(
      "https://google.com",
      "_blank"
    );

    return "Opening Google.";
  }

  if (text.includes("time")) {

    return new Date().toLocaleTimeString();
  }

  return "Command processed.";
}

// ----------------------
// SPEAK
// ----------------------
function speak(text) {

  const speech =
    new SpeechSynthesisUtterance(text);

  window.speechSynthesis.speak(speech);
}

// ----------------------
// SEND
// ----------------------
function sendMessage() {

  const text =
    inputBox.value.trim();

  if (!text) return;

  statusText.innerText =
    "PROCESSING...";

  orb.style.boxShadow =
    "0 0 120px rgba(255,255,255,0.45)";

  writeTerminal(
    "USER: " + text
  );

  const response =
    jarvisResponse(text);

  setTimeout(() => {

    writeTerminal(
      "JARVIS: " + response
    );

    speak(response);

    statusText.innerText =
      "AWAITING COMMAND...";

    orb.style.boxShadow =
      "0 0 50px rgba(255,255,255,0.15)";

  }, 700);

  inputBox.value = "";
}

// ----------------------
// EVENTS
// ----------------------
sendBtn.addEventListener(
  "click",
  sendMessage
);

inputBox.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  }
);
