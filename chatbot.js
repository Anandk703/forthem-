// ============================================
// FOR THEM - AI CHATBOT
// ============================================

// Vercel Backend URL
const API_URL = "https://forthem-backend.vercel.app";


// ============================================
// SEND MESSAGE TO BACKEND
// ============================================

async function sendChatMessage(userMessage) {

    const userName =
        localStorage.getItem("userName") || "User";

    // Empty message check
    if (!userMessage || !userMessage.trim()) {
        return "Please enter a message.";
    }

    try {

        console.log("📤 Sending message to:", `${API_URL}/api/chat`);

        const response = await fetch(`${API_URL}/api/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userMessage.trim(),
                userName: userName
            })
        });


        // Get response
        const data = await response.json();


        // Backend error
        if (!response.ok) {

            console.error("❌ Backend error:", data);

            throw new Error(
                data.message || "Chat request failed"
            );
        }


        // Successful response
        console.log("🤖 Bot:", data.reply);

        return data.reply;


    } catch (error) {

        console.error("❌ Chatbot error:", error);

        return "Sorry, I'm unable to connect right now. Please try again.";
    }
}


// ============================================
// OPTIONAL: TEST BACKEND CONNECTION
// ============================================

async function testChatbotConnection() {

    try {

        const response = await fetch(`${API_URL}/`);

        const data = await response.json();

        console.log("🔗 Backend response:", data);

        return data;

    } catch (error) {

        console.error("❌ Backend connection failed:", error);

        return null;
    }
}
