const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000/api/chat"
        : "/api/chat";

async function sendChatMessage(userMessage) {

    const userName =
        localStorage.getItem("userName") || "User";

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userMessage,
                userName: userName
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Chat request failed");
        }

        console.log("Bot:", data.reply);

        return data.reply;

    } catch (error) {

        console.error("❌ Chatbot error:", error);

        return "Sorry, I'm unable to connect right now.";
    }
}
