const inputField = document.getElementById("input-field");
const historyContainer = document.getElementById("history-container");

// Create a new instance of the Chat API client
const chatApi = new OpenAI.ChatApi(process.env.OPENAI_SECRET_KEY, {
  engine: "davinci",
});

// Create a new conversation with the given prompt
async function startConversation(prompt) {
  const response = await chatApi.createConversation({
    prompt,
  });

  return response.conversation_id;
}

// Send a message to the current conversation
async function sendMessage(conversationId, message) {
  const response = await chatApi.sendMessage({
    conversationId,
    message,
  });

  return response.messages[0];
}

// Add a new message to the history container
function addMessageToHistory(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML = `<div class="message-text">${message.text}</div><div class="message-time">${new Date(
    message.created_at
  ).toLocaleString()}</div>`;
  historyContainer.appendChild(messageElement);
  historyContainer.scrollTop = historyContainer.scrollHeight;
}

// Handle user input
inputField.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && inputField.value) {
    const message = inputField.value.trim();

    // Add the user's message to the history container
    addMessageToHistory({ text: message, created_at: Date.now() });

    // Clear the input field
    inputField.value = "";

    // Send the user's message to the chatbot and add the response to the history container
    const response = await sendMessage(window.conversationId, message);
    addMessageToHistory(response);
  }
});

// Start a new conversation when the page loads
(async () => {
  window.conversationId = await startConversation("Hello");
})();

// Export chat history to a file
function exportChatHistory() {
  const messages = [...document.querySelectorAll("#history-container .message")].map((message) => ({
    text: message.querySelector(".message-text").textContent,
    created_at: message.querySelector(".message-time").textContent,
  }));

  const content = messages.map((message) => `${message.text} (${message.created_at})`).join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "chat_history.txt");
}

// Speech-to-text functionality
const micBtn = document.getElementById("mic-btn");
const micStatus = document.getElementById("mic-status");
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

// Start speech recognition when the user clicks on the microphone button
micBtn.addEventListener("click", () => {
  if (micBtn.classList.contains("active")) {
    // Stop speech recognition
    recognition.stop();
    micBtn.classList.remove("active");
    micStatus.innerText = "Click the microphone to start speaking";
  } else {
    // Start speech recognition
    recognition.start();
    micBtn.classList.add("active");
    micStatus.innerText = "Listening...";
  }
});

// Handle speech recognition results
recognition.onresult = async (event) => {
  const result = event.results[event.results.length - 1][0].transcript.trim();

  // Add the user's message to the history container
  addMessageToHistory({ text: result, created_at: Date.now() });

  // Send the user's message to the chatbot and add the response to the history container
  const response = await sendMessage(window.conversationId, result);
  addMessageToHistory(response);
};

// Handle
