const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");
const orb = document.querySelector(".orb");

// simple response brain (starter AI logic)
function jarvisResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) {
    return "Hello. Systems online.";
  }

  if (input.includes("who are you")) {
    return "I am DRILLIONS JARVIS. Your interface assistant.";
  }

  if (input.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    return "Opening YouTube.";
  }

  if (input.includes("open google")) {
    window.open("https://google.com", "_blank");
    return "Opening Google.";
  }

  if (input.includes("status")) {
    return "All systems stable. Core running at 100%.";
  }

  return "Command not recognized. Try: hello, status, open youtube.";
}

function sendMessage() {
  const text = inputBox.value.trim();

  if (!text) return;

  const response = jarvisResponse(text);

  output.innerText = "You: " + text + "\nJarvis: " + response;

  inputBox.value = "";
}

sendBtn.addEventListener("click", sendMessage);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
