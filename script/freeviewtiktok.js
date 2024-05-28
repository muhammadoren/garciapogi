const axios = require("axios");

module.exports.config = {
    name: "freeviewtiktok",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Boost views on a TikTok video for free",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event, args }) {
    if (args.length !== 2) {
        api.sendMessage("Usage: .freeviewtiktok <username> <TikTok_video_link>", event.threadID, event.messageID);
        return;
    }

    const username = args[0];
    const videoLink = args[1];

    try {
        const response = await axios.get(`https://freeviewtiktok.onrender.com/boost?user=${username}&link=${encodeURIComponent(videoLink)}`);
        
        if (response.status === 200 && response.data.status) {
            api.sendMessage("Success! You will receive views on your TikTok video within the next few minutes.", event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while boosting views on TikTok. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error boosting views on TikTok:', error.message);
        api.sendMessage("Failed to boost views on TikTok. Please try again later.", event.threadID, event.messageID);
    }
};
