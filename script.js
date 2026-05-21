const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const terminal = document.getElementById("terminal");
const statusText = document.getElementById("status");
const orb = document.querySelector(".orb");

let lastCommand = null;
let commandHistory = [];

/* ---------------------------
   LOG
--------------------------- */
function log(text) {
  terminal.innerText = text + "\n\n" + terminal.innerText;
}

/* ---------------------------
   SPEAK (VOICE OUTPUT)
--------------------------- */
function speak(text) {
  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 0.9;

  speechSynthesis.speak(msg);
}

/* ---------------------------
   SAFE OPEN (FIX POPUP ISSUES)
--------------------------- */
function openTab(url) {
  const win = window.open(url, "_blank");

  if (!win) {
    log("⚠️ Popup blocked. Please allow popups for full experience.");
  }
}

/* ---------------------------
   NORMALIZE INPUT (KEY FIX)
--------------------------- */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/play|open|launch|start/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------------------------
   COMMAND ROUTER
--------------------------- */
function jarvisResponse(rawText) {

  const t = rawText.toLowerCase();
  const cleaned = normalize(rawText);

  // -------------------------
  // MUSIC MAP (ROBUST)
  // -------------------------
  const music = {
    "mind of a crook": {
      url: ""https://www.youtube.com/watch?v=wALHel_YMQg"",
      response: "Playing Mind of a Crook."
    }
  };

  for (let key in music) {
    if (
      t.includes(key) ||
      cleaned.includes(key)
    ) {
      openTab(music[key].url);
      return music[key].response;
    }
  }

  // -------------------------
  // COMMANDS MAP
  // -------------------------
  const commands = {

    time: () => {
      const now = new Date();

      let h = now.getHours();
      let m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";

      h = h % 12 || 12;
      m = m < 10 ? "0" + m : m;

      return `Dejuan, the time is ${h}:${m} ${ampm}`;
    },

    hello: () =>
      "Hello Dejuan. Systems online.",

    status: () =>
      "All systems operational.",

    youtube: () => {
      openTab("https://youtube.com");
      return "Opening YouTube.";
    },

    google: () => {
      openTab("https://google.com");
      return "Opening Google.";
    },

    gmail: () => {
      openTab("https://mail.google.com");
      return "Opening Gmail.";
    },

    soundcloud: () => {
      openTab("https://soundcloud.com");
      return "Opening SoundCloud.";
    }
  };

  for (let key in commands) {
    if (
      t.includes(key) ||
      cleaned.includes(key)
    ) {
      return commands[key]();
    }
  }

  return "Command not recognized, Dejuan.";
}

/* ---------------------------
   EXECUTE
--------------------------- */
function runJarvis() {

  const text = inputBox.value.trim();
  if (!text) return;

  statusText.innerText = "PROCESSING...";

  log("YOU: " + text);

  lastCommand = text;
  commandHistory.push(text);

  const response = jarvisResponse(text);

  setTimeout(() => {
    log("JARVIS: " + response);
    speak(response);
    statusText.innerText = "AWAITING COMMAND...";
  }, 300);

  inputBox.value = "";
}

/* ---------------------------
   EVENTS
--------------------------- */
sendBtn.addEventListener("click", runJarvis);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runJarvis();
});
