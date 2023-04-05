var recognition = new webkitSpeechRecognition();

recognition.addEventListener("result", function(event) {
  var transcript = event.results[0][0].transcript;
  var inputField = document.getElementById("input-field");
  inputField.value = transcript;
});
