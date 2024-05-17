const axios = require("axios");

module.exports.config = {
    name: "call",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Make a call to a phone number",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event, args }) {
    if (args.length !== 1) {
        api.sendMessage("Usage: .call <phone_number>", event.threadID, event.messageID);
        return;
    }

    const phoneNumber = args[0];

    try {
        const response = await axios.get(`https://call-02lu.onrender.com/call?number=${encodeURIComponent(phoneNumber)}`);
        
        if (response.data.message === "Sent") {
            api.sendMessage("Call successful!", event.threadID, event.messageID);
        } else if (response.data.message === "Phone number limit reached") {
            api.sendMessage("Phone number limit reached. Please try again later.", event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while making the call. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error making call:', error.message);
        api.sendMessage("Failed to make the call. Please try again later.", event.threadID, event.messageID);
    }
};
                        
