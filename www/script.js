const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");
const voiceButton = document.querySelector("#voice-btn");
const adminPopup = document.querySelector("#admin-popup");
const closeAdminPopupButton = document.querySelector("#close-admin-popup");

let userText = '';
let currentSpeech = null; // To keep track of the current speech synthesis instance
let isAdminEnteringPassword = false; // Flag to indicate if the user is entering the admin password
let enteredPassword = ''; // Store the entered password

const adminPassword = "admincpic234"; // The admin password

const maskPassword = (password) => '*'.repeat(password.length); // Function to mask the password

const loadDataFromLocalstorage = () => {
  const defaultText = `<div class="default-text">
    <h1>SmartNavigator</h1>
    <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
  </div>`;
  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  // Clear the input field after processing the user's input
  chatInput.value = "";

  // Clear the suggestion span
  const suggestion = document.getElementById("suggestion");
  suggestion.textContent = "";

  const html = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/user.jpg" alt="user-img">
      <p>${isAdminEnteringPassword ? maskPassword(userText) : userText}</p>
    </div>
  </div>`;

  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Convert the user's question to lowercase for case-insensitive matching
  const question = userText.toLowerCase();
  let answer = '';

  if (isAdminEnteringPassword) {
    // The user is entering the admin password
    if (question === adminPassword) {
      // Password is correct, show the admin pop-up
      adminPopup.style.display = "block";
      enteredPassword = userText; // Store the entered password
    } else {
      // Password is incorrect, notify the user and close the admin pop-up
      answer = "Incorrect password. Please try again.";
      adminPopup.style.display = "none";
      isAdminEnteringPassword = false;
      enteredPassword = ''; // Reset the entered password
    }
  } else {
    switch (question) {
      case "hi":
      case "hello":
        answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
        break;

      case "#admin":
        // Prompt the user to enter the admin password
        answer = "Please enter the admin password.";
        isAdminEnteringPassword = true;
        break;

      default:
        answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
        break;
    }
  }

  const answerHtml = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/chatbot.png" alt="chatbot-img">
      <p>${answer}</p>
    </div>
  </div>`;

  const incomingChatDiv = createChatElement(answerHtml, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Stop the current speech synthesis instance if it exists
  if (currentSpeech) {
    currentSpeech.onend = null; // Remove the previous onend handler
    speechSynthesis.cancel();
    currentSpeech = null;
  }

  // Use the SpeechSynthesis API to convert the response to speech
  const speech = new SpeechSynthesisUtterance(answer);

  // Adjust the speaking rate
  speech.rate = 1.5; // You can adjust the rate as needed

  // Set the onend event handler to allow new speech when the current speech ends
  speech.onend = () => {
    currentSpeech = null; // Clear the current speech reference
  };

  currentSpeech = speech; // Set the current speech reference

  speechSynthesis.speak(speech);
};

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    // Stop the current speech synthesis instance before clearing the chat
    if (currentSpeech) {
      currentSpeech.onend = null; // Remove the previous onend handler
      speechSynthesis.cancel();
      currentSpeech = null;
    }

    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);

// New event listener for voice button
voiceButton.addEventListener("click", () => {
  const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
  if (lastIncomingChat) {
    const textToSpeak = lastIncomingChat.textContent;
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(speech);
  }
});

// Add an event listener to the chat input for input changes
chatInput.addEventListener("input", () => {
  const suggestion = document.querySelector("#suggestion");
  const userText = chatInput.value;

  // Set the suggestion text based on user input
  suggestion.textContent = userText;

  // Calculate the left position for the suggestion element
  const chatInputRect = chatInput.getBoundingClientRect();
  const suggestionWidth = suggestion.offsetWidth;
  const suggestionLeft = chatInputRect.left;

  // Set the left position for the suggestion element to align it with the user's input
  suggestion.style.left = `${suggestionLeft}px`;
});

// Event listener to close the admin pop-up
closeAdminPopupButton.addEventListener("click", () => {
  adminPopup.style.display = "none";
  isAdminEnteringPassword = false; // Reset the password entry flag
  enteredPassword = ''; // Reset the entered password
});
















//back-up

// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");
// const voiceButton = document.querySelector("#voice-btn");
// const adminPopup = document.querySelector("#admin-popup");
// const closeAdminPopupButton = document.querySelector("#close-admin-popup");

// let userText = '';
// let currentSpeech = null; // To keep track of the current speech synthesis instance
// let isAdminEnteringPassword = false; // Flag to indicate if the user is entering the admin password
// let enteredPassword = ''; // Store the entered password

// const adminPassword = "admincpic234"; // The admin password

// const maskPassword = (password) => '*'.repeat(password.length); // Function to mask the password

// const loadDataFromLocalstorage = () => {
//   const defaultText = `<div class="default-text">
//     <h1>SmartNavigator</h1>
//     <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//   </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   // Clear the input field after processing the user's input
//   chatInput.value = "";

//   // Clear the suggestion span
//   const suggestion = document.getElementById("suggestion");
//   suggestion.textContent = "";

//   const html = `<div class="chat-content">
//     <div class="chat-details">
//       <img src="www/images/user.jpg" alt="user-img">
//       <p>${isAdminEnteringPassword ? maskPassword(userText) : userText}</p>
//     </div>
//   </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   if (isAdminEnteringPassword) {
//     // The user is entering the admin password
//     if (question === adminPassword) {
//       // Password is correct, show the admin pop-up
//       adminPopup.style.display = "block";
//       enteredPassword = userText; // Store the entered password
//     } else {
//       // Password is incorrect, notify the user and close the admin pop-up
//       answer = "Incorrect password. Please try again.";
//       adminPopup.style.display = "none";
//       isAdminEnteringPassword = false;
//       enteredPassword = ''; // Reset the entered password
//     }
//   } else {
//     switch (question) {
//       case "hi":
//       case "hello":
//         answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//         break;

//       case "#admin":
//         // Prompt the user to enter the admin password
//         answer = "Please enter the admin password.";
//         isAdminEnteringPassword = true;
//         break;

//       default:
//         answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
//         break;
//     }
//   }

//   const answerHtml = `<div class="chat-content">
//     <div class="chat-details">
//       <img src="www/images/chatbot.png" alt="chatbot-img">
//       <p>${answer}</p>
//     </div>
//   </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Stop the current speech synthesis instance if it exists
//   if (currentSpeech) {
//     currentSpeech.onend = null; // Remove the previous onend handler
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   // Use the SpeechSynthesis API to convert the response to speech
//   const speech = new SpeechSynthesisUtterance(answer);

//   // Adjust the speaking rate
//   speech.rate = 1.5; // You can adjust the rate as needed

//   // Set the onend event handler to allow new speech when the current speech ends
//   speech.onend = () => {
//     currentSpeech = null; // Clear the current speech reference
//   };

//   currentSpeech = speech; // Set the current speech reference

//   speechSynthesis.speak(speech);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     // Stop the current speech synthesis instance before clearing the chat
//     if (currentSpeech) {
//       currentSpeech.onend = null; // Remove the previous onend handler
//       speechSynthesis.cancel();
//       currentSpeech = null;
//     }

//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);

// // New event listener for voice button
// voiceButton.addEventListener("click", () => {
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     const speech = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(speech);
//   }
// });

// // Add an event listener to the chat input for input changes
// chatInput.addEventListener("input", () => {
//   const suggestion = document.querySelector("#suggestion");
//   const userText = chatInput.value;

//   // Set the suggestion text based on user input
//   suggestion.textContent = userText;

//   // Calculate the left position for the suggestion element
//   const chatInputRect = chatInput.getBoundingClientRect();
//   const suggestionWidth = suggestion.offsetWidth;
//   const suggestionLeft = chatInputRect.left;

//   // Set the left position for the suggestion element to align it with the user's input
//   suggestion.style.left = `${suggestionLeft}px`;
// });

// // Event listener to close the admin pop-up
// closeAdminPopupButton.addEventListener("click", () => {
//   adminPopup.style.display = "none";
//   isAdminEnteringPassword = false; // Reset the password entry flag
//   enteredPassword = ''; // Reset the entered password
// });





































// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");
// const voiceButton = document.querySelector("#voice-btn");
// const adminPopup = document.querySelector("#admin-popup");
// const closeAdminPopupButton = document.querySelector("#close-admin-popup");

// let userText = '';
// let currentSpeech = null; // To keep track of the current speech synthesis instance

// const loadDataFromLocalstorage = () => {
//   const defaultText = `<div class="default-text">
//     <h1>SmartNavigator</h1>
//     <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//   </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   // Clear the input field after processing the user's input
//   chatInput.value = "";

//   // Clear the suggestion span
//   const suggestion = document.getElementById("suggestion");
//   suggestion.textContent = "";

//   const html = `<div class="chat-content">
//     <div class="chat-details">
//       <img src="www/images/user.jpg" alt="user-img">
//       <p>${userText}</p>
//     </div>
//   </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     case "hi":
//     case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//       break;

//     // Add more questions and answers here
//     case "#admin":
//       // Show the admin pop-up when the user enters "#admin"
//       adminPopup.style.display = "block";
//       return; // Return to prevent further processing
//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//     <div class="chat-details">
//       <img src="www/images/chatbot.png" alt="chatbot-img">
//       <p>${answer}</p>
//     </div>
//   </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Stop the current speech synthesis instance if it exists
//   if (currentSpeech) {
//     currentSpeech.onend = null; // Remove the previous onend handler
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   // Use the SpeechSynthesis API to convert the response to speech
//   const speech = new SpeechSynthesisUtterance(answer);

//   // Adjust the speaking rate
//   speech.rate = 1.5; // You can adjust the rate as needed

//   // Set the onend event handler to allow new speech when the current speech ends
//   speech.onend = () => {
//     currentSpeech = null; // Clear the current speech reference
//   };

//   currentSpeech = speech; // Set the current speech reference

//   speechSynthesis.speak(speech);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     // Stop the current speech synthesis instance before clearing the chat
//     if (currentSpeech) {
//       currentSpeech.onend = null; // Remove the previous onend handler
//       speechSynthesis.cancel();
//       currentSpeech = null;
//     }

//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);

// // New event listener for voice button
// voiceButton.addEventListener("click", () => {
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     const speech = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(speech);
//   }
// });

// // Add an event listener to the chat input for input changes
// chatInput.addEventListener("input", () => {
//   const suggestion = document.querySelector("#suggestion");
//   const userText = chatInput.value;

//   // Set the suggestion text based on user input
//   suggestion.textContent = userText;

//   // Calculate the left position for the suggestion element
//   const chatInputRect = chatInput.getBoundingClientRect();
//   const suggestionWidth = suggestion.offsetWidth;
//   const suggestionLeft = chatInputRect.left;

//   // Set the left position for the suggestion element to align it with the user's input
//   suggestion.style.left = `${suggestionLeft}px`;
// });

// // Event listener to close the admin pop-up
// closeAdminPopupButton.addEventListener("click", () => {
//   adminPopup.style.display = "none";
// });















// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");
// const voiceButton = document.querySelector("#voice-btn");

// let userText = '';
// let currentSpeech = null; // To keep track of the current speech synthesis instance

// const loadDataFromLocalstorage = () => {
//   const defaultText = `<div class="default-text">
//                             <h1>SmartNavigator</h1>
//                              <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//                         </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   // Clear the input field after processing the user's input
//   chatInput.value = "";

//   // Clear the suggestion span
//   const suggestion = document.getElementById("suggestion");
//   suggestion.textContent = "";

//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="www/images/user.jpg" alt="user-img">
//                         <p>${userText}</p>
//                     </div>
//                 </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     case "hi":
//     case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//       break;

//     // Add more questions and answers here
//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//                         <div class="chat-details">
//                           <img src="www/images/chatbot.png" alt="chatbot-img">
//                           <p>${answer}</p>
//                         </div>
//                       </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Stop the current speech synthesis instance if it exists
//   if (currentSpeech) {
//     currentSpeech.onend = null; // Remove the previous onend handler
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   // Use the SpeechSynthesis API to convert the response to speech
//   const speech = new SpeechSynthesisUtterance(answer);

//   // Adjust the speaking rate
//   speech.rate = 1.5; // You can adjust the rate as needed

//   // Set the onend event handler to allow new speech when the current speech ends
//   speech.onend = () => {
//     currentSpeech = null; // Clear the current speech reference
//   };

//   currentSpeech = speech; // Set the current speech reference

//   speechSynthesis.speak(speech);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     // Stop the current speech synthesis instance before clearing the chat
//     if (currentSpeech) {
//       currentSpeech.onend = null; // Remove the previous onend handler
//       speechSynthesis.cancel();
//       currentSpeech = null;
//     }

//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);

// // New event listener for voice button
// voiceButton.addEventListener("click", () => {
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     const speech = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(speech);
//   }
// });

// // Add an event listener to the chat input for input changes
// chatInput.addEventListener("input", () => {
//   const suggestion = document.querySelector("#suggestion");
//   const userText = chatInput.value;

//   // Set the suggestion text based on user input
//   suggestion.textContent = userText;

//   // Calculate the left position for the suggestion element
//   const chatInputRect = chatInput.getBoundingClientRect();
//   const suggestionWidth = suggestion.offsetWidth;
//   const suggestionLeft = chatInputRect.left;

//   // Set the left position for the suggestion element to align it with the user's input
//   suggestion.style.left = `${suggestionLeft}px`;
// });


















// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");

// // Function to speak a message using the SpeechSynthesis API
// function speakMessage(message, voice, rate) {
//   if (currentSpeech) {
//     currentSpeech.onend = null;
//     speechSynthesis.cancel();
//   }

//   const speech = new SpeechSynthesisUtterance(message);
//   const voices = speechSynthesis.getVoices();

//   if (localStorage.getItem("selectedVoice")) {
//     const selectedVoice = localStorage.getItem("selectedVoice");
//     const voiceToSet = voices.find((voice) => voice.name === selectedVoice);

//     if (voiceToSet) {
//       speech.voice = voiceToSet;
//     }
//   }

//   speech.rate = rate;
//   currentSpeech = speech;
//   speechSynthesis.speak(speech);
// }

// // Function to handle incoming chat messages and speak them
// function handleIncomingChat() {
//   const chatContainer = document.querySelector(".chat-container");
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     speakMessage(textToSpeak, localStorage.getItem("selectedVoice"), 1.6);
//   }
// }

// // Listen for changes in the chat container and speak new messages
// const chatObserver = new MutationObserver(() => {
//   handleIncomingChat();
// });

// chatObserver.observe(document.querySelector(".chat-container"), { childList: true });

// // Initialize speaking for existing messages
// handleIncomingChat();

// const suggestedQuestionsOptions = [
//   "Where is Mr. Jomar's room?",
//   "What time does the school library close?",
//   "How do I apply for a parking pass?",
//   // Add more suggested questions here
// ];

// let userText = '';
// let currentSpeech = null; // To keep track of the current speech synthesis instance

// const loadDataFromLocalstorage = () => {
//   const themeColor = localStorage.getItem("themeColor");

//   document.body.classList.toggle("light-mode", themeColor === "light_mode");
//   const defaultText = `<div class="default-text">
//                             <h1>SmartNavigator</h1>
//                              <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//                         </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const showTypingAnimation = () => {
//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/chatbot.jpg" alt="chatbot-img">
//                         <div class="typing-animation">
//                             <div class="typing-dot" style="--delay: 0.2s"></div>
//                             <div class="typing-dot" style="--delay: 0.3s"></div>
//                             <div class="typing-dot" style="--delay: 0.4s"></div>
//                         </div>
//                     </div>
//                     <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
//                 </div>`;

//   const incomingChatDiv = createChatElement(html, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
//   getChatResponse(incomingChatDiv);
// };

// // Function to handle setting the voice based on user input
// function setVoiceByPrompt(prompt) {
//   const voices = speechSynthesis.getVoices();

//   if (prompt === "set_girl" || prompt === "set_boy") {
//     const selectedVoice = voices.find((voice) => voice.name.toLowerCase().includes(prompt));

//     if (selectedVoice) {
//       localStorage.setItem("selectedVoice", selectedVoice.name);
//       const replyMessage = `The voice has been set to ${selectedVoice.name}.`;
//       addChatMessage(replyMessage, "incoming");
//       speakMessage(replyMessage);
//     }
//   }
// }

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   chatInput.value = "";
//   chatInput.style.height = `${initialInputHeight}px`;

//   const userTextLower = userText.toLowerCase();
//   setVoiceByPrompt(userTextLower);

//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/user.jpg" alt="user-img">
//                         <p>${userText}</p>
//                     </div>
//                 </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   const question = userTextLower;
//   let answer = '';

//   switch (question) {
//     case "hi":
//     case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//       break;

//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//                         <div class="chat-details">
//                           <img src="images/chatbot.png" alt="chatbot-img">
//                           <p>${answer}</p>
//                         </div>
//                       </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   if (currentSpeech) {
//     currentSpeech.onend = null;
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   const speech = new SpeechSynthesisUtterance(answer);
//   speech.onend = () => {
//     currentSpeech = null;
//   };

//   currentSpeech = speech;
//   speechSynthesis.speak(speech);
// };

// deleteButton.addEventListener("click", () => {
//   if (currentSpeech) {
//     currentSpeech.onend = null;
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   if (confirm("Are you sure you want to delete all the chats?")) {
//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);

// // Event listener for the voice button
// voiceButton.addEventListener("click", () => {
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     const speech = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(speech);
//   }
// });

// window.addEventListener("beforeunload", () => {
//   if (currentSpeech) {
//     currentSpeech.onend = null;
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }
// });



















// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");

// const suggestedQuestionsOptions = [
//   "Where is Mr. Jomar's room?",
//   "What time does the school library close?",
//   "How do I apply for a parking pass?",
//   // Add more suggested questions here
// ];

// let userText = '';

// const loadDataFromLocalstorage = () => {
//   const themeColor = localStorage.getItem("themeColor");

//   document.body.classList.toggle("light-mode", themeColor === "light_mode");
//   const defaultText = `<div class="default-text">
//                             <h1>SmartNavigator</h1>
//                              <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//                         </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const showTypingAnimation = () => {
//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/chatbot.jpg" alt="chatbot-img">
//                         <div class="typing-animation">
//                             <div class="typing-dot" style="--delay: 0.2s"></div>
//                             <div class="typing-dot" style="--delay: 0.3s"></div>
//                             <div class="typing-dot" style="--delay: 0.4s"></div>
//                         </div>
//                     </div>
//                     <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
//                 </div>`;

//   const incomingChatDiv = createChatElement(html, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
//   getChatResponse(incomingChatDiv);
// };

// // Function to handle setting the voice based on user input
// function setVoiceByPrompt(prompt) {
//   const voices = speechSynthesis.getVoices();

//   // Check if the user wants to set the voice to "girl" or "boy"
//   if (prompt === "set_girl" || prompt === "set_boy") {
//     // Find the voice with the specified name
//     const selectedVoice = voices.find((voice) => voice.name.toLowerCase().includes(prompt));

//     if (selectedVoice) {
//       // Set the voice in local storage
//       localStorage.setItem("selectedVoice", selectedVoice.name);

//       // Provide a reply in the prompt message
//       const replyMessage = `The voice has been set to ${selectedVoice.name}.`;
//       addChatMessage(replyMessage, "incoming");

//       // Notify the user by speaking the reply
//       speakMessage(replyMessage);
//     }
//   }
// }

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   chatInput.value = "";
//   chatInput.style.height = `${initialInputHeight}px`;

//   // Check if the user wants to set the voice
//   const userTextLower = userText.toLowerCase();
//   setVoiceByPrompt(userTextLower);

//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/user.jpg" alt="user-img">
//                         <p>${userText}</p>
//                     </div>
//                 </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     case "hi":
//     case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//       break;

//     // Add more questions and answers here
//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//                         <div class="chat-details">
//                           <img src="images/chatbot.png" alt="chatbot-img">
//                           <p>${answer}</p>
//                         </div>
//                       </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);



















// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const deleteButton = document.querySelector("#delete-btn");

// const suggestedQuestionsOptions = [
//   "Where is Mr. Jomar's room?",
//   "What time does the school library close?",
//   "How do I apply for a parking pass?",
//   // Add more suggested questions here
// ];

// let userText = '';

// const loadDataFromLocalstorage = () => {
//   const themeColor = localStorage.getItem("themeColor");

//   document.body.classList.toggle("light-mode", themeColor === "light_mode");
//   const defaultText = `<div class="default-text">
//                             <h1>SmartNavigator</h1>
//                              <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>
//                         </div>`;
//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const showTypingAnimation = () => {
//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/chatbot.jpg" alt="chatbot-img">
//                         <div class="typing-animation">
//                             <div class="typing-dot" style="--delay: 0.2s"></div>
//                             <div class="typing-dot" style="--delay: 0.3s"></div>
//                             <div class="typing-dot" style="--delay: 0.4s"></div>
//                         </div>
//                     </div>
//                     <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
//                 </div>`;

//   const incomingChatDiv = createChatElement(html, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
//   getChatResponse(incomingChatDiv);
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   chatInput.value = "";
//   chatInput.style.height = `${initialInputHeight}px`;

//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/user.jpg" alt="user-img">
//                         <p>${userText}</p>
//                     </div>
//                 </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     case "hi":
//     case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//       break;

//     // Add more questions and answers here
//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the developer, Patrick Ogalesco.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//                         <div class="chat-details">
//                           <img src="images/chatbot.png" alt="chatbot-img">
//                           <p>${answer}</p>
//                         </div>
//                       </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);








// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const themeButton = document.querySelector("#theme-btn");
// const deleteButton = document.querySelector("#delete-btn");
// const voiceButton = document.querySelector("#voice-btn");
// const suggestedQuestionsOptions = [
//   "Where is Mr. Jomar's room?",
//   "What time does the school library close?",
//   "How do I apply for a parking pass?",
//   // Add more suggested questions here
// ];

// let userText = '';
// let currentSpeech = null; // To keep track of the current speech synthesis instance

// const loadDataFromLocalstorage = () => {
//   const themeColor = localStorage.getItem("themeColor");

//   document.body.classList.toggle("light-mode", themeColor === "light_mode");
//   themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

//   const defaultText = `<div class="default-text">
//                             <h1>SmartNavigator</h1>
//                              <p>Welcome to the CPIC Smart Guide Chatbot - Your Personal Campus Navigator!<br> Created by 4th Yr-BSCS Students.</p>

//                         </div>`;

//   chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
// };

// const createChatElement = (content, className) => {
//   const chatDiv = document.createElement("div");
//   chatDiv.classList.add("chat", className);
//   chatDiv.innerHTML = content;
//   return chatDiv;
// };

// const showTypingAnimation = () => {
//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/chatbot.jpg" alt="chatbot-img">
//                         <div class="typing-animation">
//                             <div class="typing-dot" style="--delay: 0.2s"></div>
//                             <div class="typing-dot" style="--delay: 0.3s"></div>
//                             <div class="typing-dot" style="--delay: 0.4s"></div>
//                         </div>
//                     </div>
//                     <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
//                 </div>`;

//   const incomingChatDiv = createChatElement(html, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);
//   getChatResponse(incomingChatDiv);
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   chatInput.value = "";
//   chatInput.style.height = `${initialInputHeight}px`;

//   const html = `<div class="chat-content">
//                     <div class="chat-details">
//                         <img src="images/user.jpg" alt="user-img">
//                         <p>${userText}</p>
//                     </div>
//                 </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Convert the user's question to lowercase for case-insensitive matching
//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     case "hi":
//      case "hello":
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
//     break;

//     // Add more questions and answers here
//     default:
//       answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the developer, Patrick Ogalesco.";
//       break;
//   }

//   const answerHtml = `<div class="chat-content">
//                         <div class="chat-details">
//                           <img src="images/chatbot.png" alt="chatbot-img">
//                           <p>${answer}</p>
//                         </div>
//                       </div>`;

//   const incomingChatDiv = createChatElement(answerHtml, "incoming");
//   chatContainer.appendChild(incomingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   // Stop the current speech synthesis instance if it exists
//   if (currentSpeech) {
//     currentSpeech.onend = null; // Remove the previous onend handler
//     speechSynthesis.cancel();
//     currentSpeech = null;
//   }

//   // Use the SpeechSynthesis API to convert the response to speech
//   const speech = new SpeechSynthesisUtterance(answer);

//   // Set the onend event handler to allow new speech when the current speech ends
//   speech.onend = () => {
//     currentSpeech = null; // Clear the current speech reference
//   };

//   currentSpeech = speech; // Set the current speech reference

//   speechSynthesis.speak(speech);
// };

// deleteButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete all the chats?")) {
//     // Stop the current speech synthesis instance before clearing the chat
//     if (currentSpeech) {
//       currentSpeech.onend = null; // Remove the previous onend handler
//       speechSynthesis.cancel();
//       currentSpeech = null;
//     }

//     localStorage.removeItem("all-chats");
//     loadDataFromLocalstorage();
//   }
// });

// themeButton.addEventListener("click", () => {
//   // Toggle body's class for the theme mode and save the updated theme to local storage
//   document.body.classList.toggle("light-mode");
//   localStorage.setItem("themeColor", themeButton.innerText);
//   themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
// });

// const initialInputHeight = chatInput.scrollHeight;

// chatInput.addEventListener("input", () => {
//   // Adjust the height of the input field dynamically based on its content
//   chatInput.style.height = `${initialInputHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   // If the Enter key is pressed without Shift and the window width is larger
//   // than 800 pixels, handle the outgoing chat
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleOutgoingChat();
//   }
// });

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);

// // New event listener for voice button
// voiceButton.addEventListener("click", () => {
//   const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
//   if (lastIncomingChat) {
//     const textToSpeak = lastIncomingChat.textContent;
//     const speech = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(speech);
//   }
// });








