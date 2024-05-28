const axios = require('axios');

module.exports.config = {
  name: "chat-bison",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "Shiki",
  description: "AI powered by blackbox",
  aliases: ["chat-bison"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://chat-bison-u0f9.onrender.com/chat-bison?q=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const ans = response.data.response;
    api.sendMessage(ans, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
