// Array of predictive text options
let predictiveTextOptions = [
  "Where is Mr. Jomar's room?",
  "Where is Mrs. Sheila's room?",
  "history",
];
predictiveTextOptions.sort();

const input = document.getElementById("chat-input");
const suggestion = document.getElementById("suggestion");

// Event listener for input changes
input.addEventListener("input", () => {
  clearSuggestion();
  const regex = new RegExp("^" + input.value, "i");

  for (let i in predictiveTextOptions) {
    if (regex.test(predictiveTextOptions[i]) && input.value !== "") {
      suggestion.textContent = predictiveTextOptions[i];
      break;
    }
  }
});

// Event listener for Enter key press
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && suggestion.textContent !== "") {
    e.preventDefault();
    input.value = suggestion.textContent;
    clearSuggestion();
  }
});

const clearSuggestion = () => {
  suggestion.textContent = "";
};

sendButton.style.display = "block";
