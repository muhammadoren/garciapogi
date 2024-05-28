const axios = require("axios");

module.exports.config = {
    name: "freespotify",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Create a free Spotify account",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event }) {
    try {
        const response = await axios.get("https://freespotify.onrender.com/spotify/create");
        
        if (response.status === 200) {
            const { email, password } = response.data;
            api.sendMessage(`Free Spotify account created successfully!\nEmail: ${email}\nPassword: ${password}`, event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while creating the Spotify account. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error creating Spotify account:', error.message);
        api.sendMessage("Failed to create the Spotify account. Please try again later.", event.threadID, event.messageID);
    }
};
