const axios = require('axios');

module.exports.config = {
  name: "leo",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by openai",
  aliases: ["black"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const text = encodeURIComponent(args.join(" "));
  const apiUrl = `https://leo-qwen.onrender.com/?q=${text}&model=leo`;

  try {
    const response = await axios.get(apiUrl);
    const result = response.data.result.replace(/\u001e/g, ''); // Remove all unicode characters
    const resultObj = JSON.parse(result);
    const output = resultObj.message;
    api.sendMessage(output, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
