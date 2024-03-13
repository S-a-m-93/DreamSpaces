const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const createChatLi = (message, className) => {
    // create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className == "outgoing" ? `<p>${message}</p>`: `<span class="glyphicon glyphicon-user"></span>  <p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

chatInput.addEventListener("keyup", (e) =>{
    // If enter key is pressed without shift key and the window
    if(e.key === "Enter" && !e.shiftkey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Typing..." message while waiting for the response
        chatbox.appendChild(createChatLi("Typing...","incoming"));
    },600)
    chatbox.scrollTo(0,chatbox.scrollHeight);
}

sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));