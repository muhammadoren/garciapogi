const axios = require('axios');

module.exports.config = {
  name: "codestral",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by mixtral",
  aliases: ["codestral"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const text = encodeURIComponent(args.join(" "));
  const apiUrl = `https://codestral.onrender.com/mixtral?question=${text}`;

  try {
    const response = await axios.get(apiUrl);
    const content = JSON.parse(response.data.content); // Parse the JSON string in the "content" property
    const output = content.output; // Access the "output" property in the parsed JSON

    api.sendMessage(output, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
