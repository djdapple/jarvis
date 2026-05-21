const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const terminal = document.getElementById("terminal");
const statusText = document.getElementById("status");
const orb = document.querySelector(".orb");

/* ---------------------------
   TERMINAL LOG
--------------------------- */
function log(text) {
  terminal.innerText =
    text + "\n\n" + terminal.innerText;
}

/* ---------------------------
   SPEAK
--------------------------- */
function speak(text) {

  window.speechSynthesis.cancel();

  const msg =
    new SpeechSynthesisUtterance(text);

  msg.rate = 0.95;
  msg.pitch = 0.9;
  msg.volume = 1;

  speechSynthesis.speak(msg);
}

/* ---------------------------
   JARVIS COMMAND SYSTEM
--------------------------- */
function jarvisResponse(text) {

  const t = text.toLowerCase();

  // -------------------------
  // TIME SYSTEM
  // -------------------------
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  const ampm =
    hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  minutes =
    minutes < 10
      ? "0" + minutes
      : minutes;

  const currentTime =
    `${hours}:${minutes} ${ampm}`;

  // -------------------------
  // COMMAND SHEET
  // -------------------------
  const commands = {

    time: () => {
      return `Dejuan, the time is ${currentTime}`;
    },

    hello: () => {
      return "Hello Dejuan. Systems online.";
    },

    status: () => {
      return "All systems operational, Dejuan.";
    },

    youtube: () => {

      window.open(
        "https://youtube.com",
        "_blank"
      );

      return "Opening YouTube, Dejuan.";
    },

    google: () => {

      window.open(
        "https://google.com",
        "_blank"
      );

      return "Opening Google, Dejuan.";
    },

    gmail: () => {

      window.open(
        "https://mail.google.com",
        "_blank"
      );

      return "Opening Gmail, Dejuan.";
    },

    soundcloud: () => {

      window.open(
        "https://soundcloud.com",
        "_blank"
      );

      return "Opening SoundCloud, Dejuan.";
    },

    spotify: () => {

      window.open(
        "https://spotify.com",
        "_blank"
      );

      return "Opening Spotify.";
    },

    netflix: () => {

      window.open(
        "https://netflix.com",
        "_blank"
      );

      return "Opening Netflix.";
    },

    weather: () => {

      window.open(
        "https://weather.com",
        "_blank"
      );

      return "Opening weather systems.";
    }
  };

  // -------------------------
  // SMART MATCH ENGINE
  // -------------------------
  for (let key in commands) {

    if (
      t.includes(key) ||
      t.includes("open " + key) ||
      t.includes("launch " + key) ||
      t.includes("go to " + key)
    ) {

      return commands[key]();
    }
  }

  return "Command not recognized, Dejuan.";
}

/* ---------------------------
   EXECUTE COMMAND
--------------------------- */
function runJarvis() {

  const text =
    inputBox.value.trim();

  if (!text) return;

  statusText.innerText =
    "PROCESSING...";

  orb.style.transform =
    "scale(1.05)";

  orb.style.boxShadow =
    "0 0 140px rgba(255,255,255,0.25)";

  log("YOU: " + text);

  const response =
    jarvisResponse(text);

  setTimeout(() => {

    log("JARVIS: " + response);

    speak(response);

    statusText.innerText =
      "AWAITING COMMAND...";

    orb.style.transform =
      "scale(1)";

    orb.style.boxShadow =
      "0 0 60px rgba(255,255,255,0.12)";

  }, 500);

  inputBox.value = "";
}

/* ---------------------------
   BUTTON
--------------------------- */
sendBtn.addEventListener(
  "click",
  runJarvis
);

/* ---------------------------
   ENTER KEY
--------------------------- */
inputBox.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {
      runJarvis();
    }
  }
);

/* ---------------------------
   STARTUP MESSAGE
--------------------------- */
window.onload = () => {

  setTimeout(() => {

    const startup =
      "Welcome back, Dejuan.";

    log("JARVIS: " + startup);

    speak(startup);

  }, 1200);
};
