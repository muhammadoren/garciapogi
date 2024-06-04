const axios = require('axios');

module.exports.config = {
  name: "alpha",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by blackbox",
  aliases: ["gpt4"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const text = encodeURIComponent(args.join(" "));
  const apiUrl = `https://alpha-vjku.onrender.com/alpha?question=${text}`;

  try {
    const response = await axios.get(apiUrl);
    const output = response.data.content; // Access the "content" property in the JSON response
    api.sendMessage(output, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
