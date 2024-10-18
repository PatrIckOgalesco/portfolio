<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "faqs";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$queries_sql = "SELECT Queries FROM faqs";
$queries_result = $conn->query($queries_sql);

$queries = array();
if ($queries_result->num_rows > 0) {
    while($row = $queries_result->fetch_assoc()) {
        $queries[] = $row['Queries'];
    }
}

$faqs_sql = "SELECT Queries, Answers FROM faqs";
$faqs_result = $conn->query($faqs_sql);

$faqs = array();
if ($faqs_result->num_rows > 0) {
    while($row = $faqs_result->fetch_assoc()) {
        $faqs[$row['Queries']] = $row['Answers'];
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet">

   <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">

   <link
    rel="shortcut icon"
      href="https://raw.githubusercontent.com/PatrIckOgalesco/portfolio/refs/heads/main/assets/images/logo.ico"
      type="image/x-icon"
  />
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Courier New', monospace;
    }

    ::selection {
      color: #fff;
      background: #007acc;
    }

    .window {
      padding: 10px;
    }

    body {
      background: linear-gradient(135deg, #1e1e1e, #2d2d2d);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      scrollbar-color: #66ccff #1e1e1e;
    }

    .terminal {
      max-width: 90%;
      max-height: 80%;
      padding: 30px;
      background-color: #0d0d0d;
      color: #e0e0e0;
      border-radius: 15px;
      overflow-y: auto;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
    }

    /* Taskbar Styles */
    .window__taskbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      border-bottom: 1px solid #ccc;
      height: 50px;
    }

    .window__taskbar--actions button {
      width: 15px;
      height: 15px;
      margin-right: 2px;
      border-radius: 50%;
      border: none;
    }

    .close { background-color: #ff5f57; }
    .minimize { background-color: #ffbd2e; }
    .maximize { background-color: #28c940; }

    .window__taskbar--content h4 {
      font-size: 14px;
      font-weight: normal;
      margin: 0;
      color: #666;
    }

    /* Terminal Content */
    .title {
      font-family: "Tiny5", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 90px;
      color: #ffffff;
      margin-bottom: 15px;
    }

    .info-text {
      font-size: 16px;
      color: hsl(31.35deg 82.89% 63.33%);
      background-color: rgba(255, 255, 255, 0.1);
      padding: 5px 10px;
      border-radius: 5px;
      margin: 5px 0;
      display: inline-block;
    }

    .info-text2 {
      font-size: 16px;
      color: hsl(31.35deg 82.89% 63.33%);
      background-color: rgba(255, 255, 255, 0.1);
      padding: 5px 10px;
      border-radius: 5px;
      margin: 5px 0;
      display: inline-block;
    }
    .responce {
      color: #ffcc00; /* Terminal text color */
      font-weight: bold;
      display: inline-flex;
      align-items: center;
      font-size: 16px;
    }

    .bx {
      margin-right: 8px; /* Spacing between icon and text */
    }


    .intelliSence {
      position: absolute;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      color: #000000;
      padding: 5px;
      cursor: default;
      display: none; /* Hidden by default */
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 10;
    }

    .intelliSence.show {
      display: block; /* Show when the class is added */
      opacity: 1;
      transform: translateY(0);
    }

    .content p {
      font-size: 16px;
      margin: 0;
      padding: 5px 5px;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .content p:hover {
      background-color: #007acc;
      color: white;
      border-radius: 5px;
    }

    .cursor {
      outline: none;
      display: inline;
      white-space: nowrap; /* Prevent wrapping */
      word-break: keep-all; /* Keep text together */
    }

    .cursor::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 18px;
      background-color: #ff4655;
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0% { background-color: #00ff7f; }
      50% { background-color: transparent; }
      100% { background-color: #00ff7f; }
    }

    .terminal_line {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .color_green {
      color: #00ff7f;
    }

    .color_blue {
      color: #66ccff;
    }

    .response {
      color: #ffcc00;
    }

    #chat-output {
      max-height: 400px; /* Set a max-height to enable scrolling */
      overflow-y: auto; /* Enable vertical scrolling */
    }

    @media (max-width: 600px) {
      *{
        font-size: 12px;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .terminal {
        width: 90%;
        margin: 0 auto;
        padding: 10px;
      }
      .terminal_line {
        font-size: 12px;
      }

      .title {
        font-size: 60px;
        font-weight: 500;
      }
    }

  </style>
</head>
<body>
  <div class="window terminal">
    <div class="window__taskbar">
      <div class="window__taskbar--actions">
        <button class="close"></button>
        <button class="minimize"></button>
        <button class="maximize"></button>
      </div>
      <div class="window__taskbar--content">
        <h4>Terminal -- zsh - v1.0.0.0</h4>
      </div>
    </div><br>
  
    <p class="title">Personal Portfolio</p>
    <p>
      <span class="info-text">echo</span> Script-Based Chatbot | v1.1.0<br>
      <span class="info-text">echo</span> Your environment has been set up!<br>
      <span class="info-text">echo</span> Start typing............
    </p><br>
    
    <div id="chat-output"></div>
    
    <div class="terminal_line">
      <p>
        <span class="color_green">➜</span>&nbsp;&nbsp;
        <span class="color_blue">~</span>&nbsp;
        <span contenteditable="true" class="cursor" id="chat-input" oninput="showIntelliSense(event)"></span>
      </p>
    </div>

    <div class="intelliSence" id="intelliSence">
      <div class="content" id="messages"></div>
    </div>
  </div>

  <script>
    const predictiveTextOptions = <?php echo json_encode($queries); ?>;
const defaultResponses = <?php echo json_encode($faqs); ?>;

const chatInput = document.getElementById("chat-input");
const chatOutput = document.getElementById("chat-output");
const intelliSence = document.getElementById("intelliSence");
const messages = document.getElementById("messages");

function showIntelliSense(event) {
    const inputText = event.target.innerText.toLowerCase().trim();
    const matchedOptions = predictiveTextOptions.filter(option => option.toLowerCase().includes(inputText));

    messages.innerHTML = '';
    intelliSence.classList.toggle('show', matchedOptions.length > 0); // Keep showing if matched options exist

    matchedOptions.forEach(option => {
        const optionElement = document.createElement('p');
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option);
        messages.appendChild(optionElement);
    });

    const rect = event.target.getBoundingClientRect();
    intelliSence.style.top = `${rect.bottom + window.scrollY}px`;
    intelliSence.style.left = `${rect.left}px`;
}

function selectOption(option) {
    chatInput.innerText = option; // Set the input area with the selected option
    executeCommand(option); // Automatically display the response for the selected option
    intelliSence.classList.remove('show'); // Hide IntelliSense after selection
}

chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const input = chatInput.innerText.trim();
        if (input) {
            executeCommand(input);
            intelliSence.classList.remove('show'); // Hide IntelliSense after command execution
        }
        event.preventDefault();
    } else {
        showIntelliSense(event);
    }
});

function executeCommand(input) {
    const normalizedInput = input.trim();
    const response = defaultResponses[normalizedInput];
    if (response) {
        displayResponse(input, response, '#b5e4f4'); // Show normal response in the specified color
    } else {
      displayResponse(input, `<span style="color: #ffcc00;">zsh:&nbsp; </span><span style="color: #b5e4f4;">&nbsp;command not found:&nbsp;</span>${input}`, '#ffcc00'); 
  }

}

function displayResponse(input, response, color) {
    const lineElement = document.createElement("div");
    lineElement.classList.add("terminal_line");
    lineElement.innerHTML = `<span class="color_green">➜</span>&nbsp;&nbsp;<span class="color_blue">~$ cmd: </span>&nbsp;${input}`;
    chatOutput.appendChild(lineElement);

    const responseElement = document.createElement("div");
    responseElement.classList.add("terminal_line", "response");
    responseElement.style.color = color; // Set the color of the response
    chatOutput.appendChild(responseElement);

    // Call the typing animation function
    typeResponse(responseElement, response).then(() => {
        // Add an empty div to create space after the response
        const spaceElement = document.createElement("div");
        spaceElement.classList.add("terminal_line"); // You can also add a specific class for styling if needed
        chatOutput.appendChild(spaceElement); // This creates a blank line after the response

        // Scroll to bottom after the response has been fully typed
        scrollToBottom();
    });

    chatInput.innerText = ''; // Clear the input after command execution
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeResponse(responseText, answer) {
    let i = 0;
    while (i < answer.length) {
        const char = answer[i];
        responseText.innerHTML = answer.substring(0, i + 1);
        await sleep(15); // Adjust typing speed here

        // Scroll to the bottom after each character
        scrollToBottom(); 

        i++;
    }
}

// Scroll to the bottom of the terminal content
function scrollToBottom() {
    const terminalContent = document.getElementById('chat-output'); // Ensure this matches your output container's ID
    terminalContent.scrollTop = terminalContent.scrollHeight; // Set the scroll position to the bottom
}


  </script>
</body>
</html>
