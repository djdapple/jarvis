const output = document.getElementById("output");
const statusText = document.getElementById("status");

// -------------------------
// TEXT TO SPEECH
// -------------------------
function speak(text) {

  const speech = new SpeechSynthesisUtterance(text);

  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

// -------------------------
// VOICE RECOGNITION
// -------------------------
const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (!SpeechRecognition) {

  statusText.innerText =
    "VOICE NOT SUPPORTED";

} else {

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;

  recognition.lang = "en-US";

  recognition.onstart = () => {

    statusText.innerText =
      "LISTENING...";
  };

  recognition.onresult = (event) => {

    const transcript =
      event.results[event.results.length - 1][0]
      .transcript;

    output.innerText =
      `Heard: ${transcript}`;

    // WAKE WORD
    if (
      transcript.toLowerCase().includes("hey jarvis")
    ) {

      output.innerText =
        "Jarvis Activated";

      speak("Yes?");
    }
  };

  recognition.onerror = (event) => {

    output.innerText =
      "Voice Error: " + event.error;
  };

  recognition.start();
}
