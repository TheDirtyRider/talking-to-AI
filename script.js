const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

const inputField = document.getElementById("input-field");
const micBtn = document.getElementById("mic-btn");
const micStatus = document.getElementById("mic-status");
const historyContainer = document.getElementById("history-container");

let isRecording = false;

recognition.onresult = function(event) {
  let finalTranscript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      inputField.value = finalTranscript + transcript;
    }
  }
  inputField.value = finalTranscript;
  historyContainer.innerHTML += `<p class="message">${finalTranscript}</p>`;
};

recognition.onstart = function() {
  micBtn.classList.add("recording");
  micStatus.classList.add("recording");
};

recognition.onend = function() {
  micBtn.classList.remove("recording");
  micStatus.classList.remove("recording");
};

micBtn.addEventListener("click", function() {
  if (!isRecording) {
    isRecording = true;
    recognition.start();
    micBtn.style.backgroundColor = "#f44336"; // red
  } else {
    isRecording = false;
    recognition.stop();
    micBtn.style.backgroundColor = "#4CAF50"; // green
  }
});
