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

//   const defaultText = ` <div class="default-text">
//                             <h1>CPICCHAT</h1>
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
//       answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompt, and I'll be happy to provide you with the information you need.";
//     break;
//     case "history of cpic?":
//     case  "history of Christian Polytechnic Institute of Catanduanes":
//       answer = "The Christian Polytechnic Institute of Catanduanes Inc. (CPIC) was established in 1999 with its campus at San Roque, Virac, Catanduanes. It initially had 38 students. The original incorporators were Atty. Arnel C. Sarmiento, Elisa B. Sarmiento, Francisco Sarmiento, Amelia Sarmiento, and Castor Balane. <br><br>" +
//            "CPIC also offers Bachelor of Science in Criminology (BSC), Bachelor of Science in Computer Science (BSCS), Associate in Computer Technology (ACT), Bachelor of Science in Tourism Management (BSTM) and Bachelor of Technical Teacher Education (BTTE) Major in Food and Service Management under the Commission on Higher Education (CHED), Food and Beverage Services NC II (FBS), Bartending NC II (BAR), Electronic Products Assembly and Servicing NC II (EPAS), and Computer System Servicing NC II (CSS) under the Technical Education and Skills Development Authority (TESDA). Senior High School is also offered. The courses offered in senior high school are the following: Accountancy and Business Management (ABM); Humanities and Social Science (HUMMS); Science, Technology, Engineering and Mathematics (STEM); Computer System Servicing (CSS); Electronic Products Assembly and Servicing (EPAS); and Home Economics (Food and Beverage Services, Bartending, Housekeeping, Front Office Services).<br><br>" +
//            "At present, CPIC has 1,301 enrollees and has its own building in Francia, Virac, Catanduanes. CPIC building consists of four stories, 28 rooms, complete with state-of-the-art equipment and facilities. Tuition fee is ranging from 115.50 to 250 pesos per unit. In BS Criminology, the tuition is 250 pesos per unit; CPIC has a total of 56 faculties employed. Thirty-seven (43) are teaching, and eight (13) are non-teaching. CPIC also has a Pre-School and Elementary located at Chinese School compound, Sta. Elena, Virac, Catanduanes, in front of Marem’s Pension House.<br><br>" +
//            "The Christian Polytechnic Institute of Catanduanes is an institution of higher learning in Virac, Catanduanes, that currently serves approximately 1300 students, and the enrolment growth rate is 11% over the three-year period. The fact that the institution has an increasing population, it aims to continue improving its quality service to be more competitive with other colleges and universities in the Bicol Region and the nation.";
//     break;

//     case "where is Mr. Jomar's room?":
//       answer = "Mr. Jomar's room is located on the 4th floor, room 143.";
//       break;
//     case "what time does the school library close?":
//       answer = "The school library closes at 5:00 PM.";
//       break;
//     case "how do I apply for a parking pass?":
//       answer = "To apply for a parking pass, please visit the school's administration office.";
//       break;
//     case "list of 4th year bs computer science students":
//       answer = "Here is the list of BS Computer Science 4th-year students of school year 2023-2024:\n\n" +
//       "1. Jovenal Eubra\n" +
//       "2. Jon Kenneth Ambrosio\n" +
//       "3. John Patrick Ogalesco\n" +
//       "4. Roel Vargas\n" +
//       "5. Peter Torrecampo\n" +
//       "6. John Lester Vargas\n" +
//       "7. Mark Anthony Buenaobra\n" +
//       "8. Francis Tawsula\n" +
//       "9. Nelmar Orbe\n" +
//       "10. Ryan Carlo Ibayan\n" +
//       "11. Jeson Tangher\n" +
//       "12. Jozel-an Tarroza\n" +
//       "13. Claire Villegas\n" +
//       "14. Ellaine Veeran\n" +
//       "15. Jolina Idanan\n" +
//       "16. Assunta Soliveres\n" +
//       "17. Erika Melgar";
//     break;
//       case "who is cpic president":
//       answer = "The President of CPIC is Atty. Arnel C. Sarmiento, who also serves as the Board Chairman.";
//     break;
//       case "what year CPIC founded?":
//       answer = "The Christian Polytechnic Institute of Catanduanes Inc. (CPIC) was founded in 1999.";
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
















const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");

const suggestedQuestionsOptions = [
  "Where is Mr. Jomar's room?",
  "What time does the school library close?",
  "How do I apply for a parking pass?",
  // Add more suggested questions here
];

let userText = '';

const loadDataFromLocalstorage = () => {
  const themeColor = localStorage.getItem("themeColor");

  document.body.classList.toggle("light-mode", themeColor === "light_mode");
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

const showTypingAnimation = () => {
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;

  const incomingChatDiv = createChatElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv);
};

function setVoiceByPrompt(prompt) {
  let selectedVoice = "US English Female"; // Default voice

  if (prompt === "set_girl") {
    selectedVoice = "US English Female";
  } else if (prompt === "set_boy") {
    selectedVoice = "US English Male";
  }

  // Set the selected voice in local storage
  localStorage.setItem("selectedVoice", selectedVoice);

  // Provide a reply in the prompt message
  const replyMessage = `The voice has been set to ${selectedVoice}.`;
  addChatMessage(replyMessage, "incoming");

  // Notify the user by speaking the reply
  speakMessage(replyMessage, selectedVoice, 1.5); // Adjust rate as needed
}

function speakMessage(message, voice, rate) {
  responsiveVoice.speak(message, voice, { rate: rate });
}

const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  chatInput.value = "";
  chatInput.style.height = `${initialInputHeight}px`;

  // Check if the user wants to set the voice
  const userTextLower = userText.toLowerCase();
  setVoiceByPrompt(userTextLower);

  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Convert the user's question to lowercase for case-insensitive matching
  const question = userText.toLowerCase();
  let answer = '';

  switch (question) {
    case "hi":
    case "hello":
      answer = "Hello there!<br><br>" + "How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
      break;

    // Add more questions and answers here
    default:
      answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the developer, Patrick Ogalesco.";
      break;
  }

  const answerHtml = `<div class="chat-content">
                        <div class="chat-details">
                          <img src="images/chatbot.png" alt="chatbot-img">
                          <p>${answer}</p>
                        </div>
                      </div>`;

  const incomingChatDiv = createChatElement(answerHtml, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
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
