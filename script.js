var recognition = new webkitSpeechRecognition();

recognition.addEventListener("result", function(event) {
  var transcript = event.results[0][0].transcript;
  var inputField = document.getElementById("input-field");
  inputField.value = transcript;
});

document.getElementById("mic-btn").addEventListener("click", function() {
  recognition.start();
});
const input = document.getElementById('input');
const speakButton = document.getElementById('speak');
const historyList = document.getElementById('history-list');
let recognizing = false;
let recognition;

if (!('webkitSpeechRecognition' in window)) {
  console.log('Speech recognition is not supported in this browser.');
} else {
  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    recognizing = true;
    console.log('Voice input started...');
  };
  
  recognition.onend = () => {
    recognizing = false;
    console.log('Voice input ended.');
  };
  
  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    
    console.log(`Interim transcript: ${interimTranscript}`);
    console.log(`Final transcript: ${finalTranscript}`);
    
    if (finalTranscript !== '') {
      input.value = finalTranscript;
      const li = document.createElement('li');
      li.textContent = finalTranscript;
      historyList.appendChild(li);
    }
  };
}

speakButton.addEventListener('click', () => {
  if (!recognizing) {
    recognition.start();
  } else {
    recognition.stop();
  }
});
