const ruleBasedAnswers = {
    "hi": "Hello! How can I help you?",
    "hello": "Hi there! Ask me something.",
    "how to sync data": "Click the 'Sync Now' button in the top-right.",
    "how to reset password": "Go to Settings > Reset Password.",
    "how to add product": "Click 'Add Product' in Inventory section.",
    "bye": "Goodbye! Have a nice day."
};

function sendRuleMessage() {
    const input = document.getElementById("chatInput");
    const userMessage = input.value.trim().toLowerCase();
    const chatbox = document.getElementById("chatbox");

    if (!userMessage) return;

    chatbox.innerHTML += `<div><b>You:</b> ${userMessage}</div>`;
    input.value = '';

    const response = ruleBasedAnswers[userMessage] || "Sorry, I didn't understand that. Please try something else.";
    chatbox.innerHTML += `<div><b>Bot:</b> ${response}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}
