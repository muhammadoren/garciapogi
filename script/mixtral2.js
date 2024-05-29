const axios = require('axios');

module.exports.config = {
  name: "mixtral2",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by openai",
  aliases: ["mixtral2"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const question = encodeURIComponent(args.join(" "));
  const apiUrl = `https://mextral.onrender.com/nividea?model=mistralai/mistral-large&question=${question}`;

  try {
    const response = await axios.get(apiUrl);
    const output = response.data.response; // Access the "response" property in the JSON response
    api.sendMessage(output, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
