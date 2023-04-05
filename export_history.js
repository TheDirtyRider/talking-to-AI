const fs = require("fs");

// Replace the path below with the path to your chat history file. so for me it looks like C:\Users\Nope\Desktop\my-website\chat_hisotry.txt
const filePath = "/path/to/your/chat_history.txt";

// Read the contents of the chat history file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;

  // Replace the newline character with a space
  const text = data.replace(/\n/g, " ");

  // Write the formatted text to a new file named "formatted_history.txt"
  fs.writeFile("formatted_history.txt", text, (err) => {
    if (err) throw err;
    console.log("Chat history has been formatted and saved as formatted_history.txt");
  });
});
