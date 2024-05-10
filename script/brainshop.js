const axios = require('axios');

module.exports.config = {
  name: "brainshop",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by BrainShop",
  aliases: ["brain"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `http://api.brainshop.ai/get?bid=181853&key=xo0fAJj38oX32dHh&uid=181853&msg=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const ans = response.data.cnt;
    api.sendMessage(ans, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
