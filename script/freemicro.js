const axios = require("axios");

module.exports.config = {
    name: "freemicro",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Create a free micro team",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event }) {
    try {
        const response = await axios.get("https://freemicro.onrender.com/teams/create");
        
        if (response.status === 200) {
            const { email, password } = response.data;
            api.sendMessage(`Micro team created successfully!\nEmail: ${email}\nPassword: ${password}`, event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while creating the micro team. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error creating micro team:', error.message);
        api.sendMessage("Failed to create the micro team. Please try again later.", event.threadID, event.messageID);
    }
};
