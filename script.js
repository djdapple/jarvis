const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const terminal = document.getElementById("terminal");
const statusText = document.getElementById("status");
const orb = document.querySelector(".orb");

function log(text) {
  terminal.innerText = text + "\n\n" + terminal.innerText;
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
   OPEN LINK SAFELY
--------------------------- */
function openTab(url) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ---------------------------
   CALENDAR
--------------------------- */
function generateCalendar() {

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const names = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  document.getElementById("calHeader").innerText =
    `${names[month]} ${year}`;

  const grid = document.getElementById("calGrid");
  grid.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= days; d++) {

    const el = document.createElement("div");
    el.classList.add("calendar-day");
    el.innerText = d;

    if (d === today) {
      el.classList.add("today");
    }

    grid.appendChild(el);
  }
}

/* ---------------------------
   JARVIS ENGINE
--------------------------- */
function jarvisResponse(text) {

  const t = text.toLowerCase();

  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;
  m = m < 10 ? "0" + m : m;

  const time = `${h}:${m} ${ampm}`;

  /* MUSIC */
  if (t.includes("mind of a crook")) {
    openTab("https://www.youtube.com/watch?v=wALHel_YMQg");
    return "Playing Mind of a Crook.";
  }

  /* COMMANDS */
  if (t.includes("time")) return `Dejuan, the time is ${time}`;

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

  return "Command not recognized, Dejuan.";
}

/* ---------------------------
   RUN
--------------------------- */
function runJarvis() {

  const text = inputBox.value.trim();
  if (!text) return;

  log("YOU: " + text);

  const response = jarvisResponse(text);

  setTimeout(() => {
    log("JARVIS: " + response);
    speak(response);
  }, 250);

  inputBox.value = "";
}

/* ---------------------------
   EVENTS
--------------------------- */
sendBtn.addEventListener("click", runJarvis);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runJarvis();
});

/* ---------------------------
   STARTUP
--------------------------- */
window.onload = () => {
  generateCalendar();

  setTimeout(() => {
    const msg = "Jarvis systems online.";
    log("JARVIS: " + msg);
    speak(msg);
  }, 800);
};
