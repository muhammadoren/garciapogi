const axios = require('axios');

module.exports.config = {
  name: "charac",
  version: "1.1.0",
  role: 0,
  hasPrefix: true,
  credits: "shiki",
  description: "Get responses from characters.",
  aliases: [],
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  // Check if there are enough arguments
  if (args.length < 3) {
    api.sendMessage("Please provide both a character name, a source, and a question.", event.threadID, event.messageID);
    return;
  }

  // Extract character name, source, and question
  const character = encodeURIComponent(args.shift());
  let source = "";
  let question = "";
  const index = args.indexOf("source");
  if (index !== -1) {
    source = encodeURIComponent(args.slice(index + 1, args.length - 1).join(" "));
    question = encodeURIComponent(args.slice(0, index).join(" "));
  } else {
    source = "unknown"; // If source is not provided, set it to unknown
    question = encodeURIComponent(args.join(" "));
  }

  // Construct the API URL
  const apiUrl = `https://character-f52g.onrender.com/chat?character=${character}&question=${question}&source=${source}`;

  try {
    // Make the API request
    const response = await axios.get(apiUrl);
    const chatResult = response.data.chatResult;

    // Send the response back to the user
    api.sendMessage(chatResult, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
