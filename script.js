function runCommand(text) {

  const t = text.toLowerCase();

  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;
  m = m < 10 ? "0" + m : m;

  const time = `${h}:${m} ${ampm}`;

  // SHORTCUT COMMANDS
  if (t === "c") {
    openTab("https://soundcloud.com");
    return "Opening SoundCloud.";
  }

  if (t === "g") {
    openTab("https://mail.google.com");
    return "Opening Gmail.";
  }

  if (t === "y") {
    openTab("https://youtube.com");
    return "Opening YouTube.";
  }

  // MUSIC
  if (t.includes("mind of a crook")) {
    openTab("https://www.youtube.com/watch?v=wALHel_YMQg");
    return "Playing Mind of a Crook.";
  }

  // BASIC COMMANDS
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
