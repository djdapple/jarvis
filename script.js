const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const terminal = document.getElementById("terminal");
const statusText = document.getElementById("status");

function log(text) {
  terminal.innerText = text + "\n\n" + terminal.innerText;
}

function speak(text) {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 0.9;
  speechSynthesis.speak(msg);
}

function openTab(url) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ---------------------------
   COMMANDS ONLY (NO AI)
--------------------------- */
function runCommand(text) {

  const t = text.toLowerCase();

  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;
  m = m < 10 ? "0" + m : m;

  const time = `${h}:${m} ${ampm}`;

  // -------------------------
  // MUSIC
  // -------------------------
  if (t.includes("mind of a crook")) {
    openTab("https://www.youtube.com/watch?v=wALHel_YMQg");
    return "Playing Mind of a Crook.";
  }

  // -------------------------
  // BASIC COMMANDS
  // -------------------------
  if (t.includes("time")) {
    return `Dejuan, the time is ${time}`;
  }

  if (t.includes("youtube")) {
    openTab("https://youtube.com");
    return "Opening YouTube.";
  }

  if (t.includes("google")) {
    openTab("https://google.com");
    return "Opening Google.";
  }

  if (t.includes("soundcloud")) {
    openTab("https://soundcloud.com");
    return "Opening SoundCloud.";
  }

  if (t.includes("gmail")) {
    openTab("https://mail.google.com");
    return "Opening Gmail.";
  }

  return "Command not recognized.";
}

/* ---------------------------
   EXECUTION
--------------------------- */
function runJarvis() {

  const text = inputBox.value.trim();
  if (!text) return;

  log("YOU: " + text);

  const response = runCommand(text);

  setTimeout(() => {
    log("JARVIS: " + response);
    speak(response);
  }, 200);

  inputBox.value = "";
}

/* ---------------------------
   EVENTS
--------------------------- */
sendBtn.addEventListener("click", runJarvis);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runJarvis();
});
