const axios = require('axios');

module.exports.config = {
  name: "gpt4",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "Eugene Aguilar",
  description: "AI powered by blackbox",
  aliases: ["black"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const text = encodeURIComponent(args.join(" "));
  const apiUrl = `https://ai-models-d2nz.onrender.com/gpt?model=gpt-4&prompt=${text}`;

  try {
    const response = await axios.get(apiUrl);
    const output = response.data.gpt; // Access the "gpt" property in the JSON response
    api.sendMessage(output, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
