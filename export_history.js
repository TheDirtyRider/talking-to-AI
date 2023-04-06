function exportHistory() {
  const input = document.createElement("input");
  input.type = "file";

  // When the file is selected, read its contents
  input.onchange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;

      // Replace newline characters with spaces
      const formattedContents = contents.replace(/\n/g, " ");

      // Set the input field value to the formatted contents
      document.getElementById("input-field").value = formattedContents;
    };
    reader.readAsText(file);
  };

  // Simulate a click event on the input element
  input.click();
}
