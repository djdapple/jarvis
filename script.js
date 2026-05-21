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
  terminal.innerText =
    text + "\n\n" + terminal.innerText;
}

/* ---------------------------
   SPEECH
--------------------------- */
function speak(text) {
  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 0.9;

  speechSynthesis.speak(msg);
}

/* ---------------------------
   JARVIS RESPONSE ENGINE
--------------------------- */
function jarvisResponse(text) {

  const t = text.toLowerCase();

  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  m = m < 10 ? "0" + m : m;

  const timeString = `${h}:${m} ${ampm}`;

  /* -------------------------
     MUSIC LIBRARY
  --------------------------*/
  const music = {
    "mind of a crook": {
      url: "https://youtu.be/wALHel_YMQg?si=IpaByTNS_Dk4PJW_",
      response: "Playing Mind of a Crook."
    }
  };

  /* -------------------------
     COMMANDS
  --------------------------*/
  const commands = {

    time: () =>
      `Dejuan, the time is ${timeString}`,

    hello: () =>
      "Hello Dejuan. Systems online.",

    status: () =>
      "All systems operational.",

    youtube: () => {
      window.open("https://youtube.com", "_blank");
      return "Opening YouTube.";
    },

    google: () => {
      window.open("https://google.com", "_blank");
      return "Opening Google.";
    },

    soundcloud: () => {
      window.open("https://soundcloud.com", "_blank");
      return "Opening SoundCloud.";
    }
  };

  /* -------------------------
     MUSIC MATCH FIRST
  --------------------------*/
  for (let key in music) {
    if (t.includes(key)) {
      window.open(music[key].url, "_blank");
      return music[key].response;
    }
  }

  /* -------------------------
     NORMAL COMMAND MATCH
  --------------------------*/
  for (let key in commands) {
    if (
      t.includes(key) ||
      t.includes("open " + key) ||
      t.includes("launch " + key)
    ) {
      return commands[key]();
    }
  }

  return "Command not recognized, Dejuan.";
}

/* ---------------------------
   RUN
--------------------------- */
function runJarvis() {

  const text = inputBox.value.trim();
  if (!text) return;

  log("YOU: " + text);

  lastCommand = text;
  commandHistory.push(text);

  const response = jarvisResponse(text);

  setTimeout(() => {
    log("JARVIS: " + response);
    speak(response);
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
