const axios = require('axios');

module.exports.config = {
  name: "zhipu",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by glm2",
  aliases: ["ai"],
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://zhipu-ai.onrender.com/zhipu?question=${query}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const ans = response.data.message; // Use 'message' instead of 'response' as per example JSON
      api.sendMessage(ans, event.threadID, event.messageID);
    } else {
      api.sendMessage("Unexpected response status: " + response.status, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error:", error.message || error);
    api.sendMessage("An error occurred while fetching the response. Please try again later.", event.threadID, event.messageID);
  }
};
