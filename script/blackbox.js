const axios = require('axios');

module.exports.config = {
  name: "blackbox",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by duckgo",
  aliases: ["ai"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://g4f-eqak.onrender.com/ai=blackbox=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const ans = response.data.response;
    api.sendMessage(ans, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
