const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const terminal = document.getElementById("terminal");
const statusText = document.getElementById("status");
const orb = document.querySelector(".orb");

/* ---------------------------
   TERMINAL
--------------------------- */
function log(text) {
  terminal.innerText = text + "\n\n" + terminal.innerText;
}

/* ---------------------------
   SPEAK
--------------------------- */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
}

/* ---------------------------
   JARVIS BRAIN (COMMANDS)
--------------------------- */
function jarvisResponse(text) {
  const t = text.toLowerCase();

  // FIXED RELIABLE COMMANDS
  if (t.includes("youtube")) {
    window.open("https://youtube.com", "_blank");
    return "Opening YouTube.";
  }

  if (t.includes("google")) {
    window.open("https://google.com", "_blank");
    return "Opening Google.";
  }

  if (t.includes("time")) {
    return new Date().toLocaleTimeString();
  }

  if (t.includes("status")) {
    return "All systems stable.";
  }

  if (t.includes("hello")) {
    return "Hello. I am Jarvis.";
  }

  return "Command not recognized.";
}

/* ---------------------------
   EXECUTE
--------------------------- */
function runJarvis() {
  const text = inputBox.value.trim();
  if (!text) return;

  statusText.innerText = "PROCESSING...";

  log("YOU: " + text);

  const response = jarvisResponse(text);

  setTimeout(() => {
    log("JARVIS: " + response);

    speak(response);

    statusText.innerText = "AWAITING COMMAND...";

  }, 400);

  inputBox.value = "";
}

/* ---------------------------
   EVENTS
--------------------------- */
sendBtn.addEventListener("click", runJarvis);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runJarvis();
});
