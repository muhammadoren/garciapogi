const axios = require('axios');

module.exports.config = {
  name: "gpt4",
  version: "1.0.0",
  credits: "shiki",
  hasPermission: 0,
  commandCategory: "utility",
  usage: "[prefix]pi [query]",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const query = args.join(" ");
    if (query) {
      const processingMessage = await api.sendMessage(`Searching🔍. Please wait a moment...`, event.threadID);

      const response = await axios.get(`https://gpt4-l59t.onrender.com/gpt4=${encodeURIComponent(query)}`);

      if (response.data && response.data.response) {
        await api.sendMessage({ body: response.data.response.trim() }, event.threadID, event.messageID);
        console.log(`Sent GPT-4's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from GPT-4 API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get GPT-4's response: ${error.message}`);
    api.sendMessage(`❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);
  }
};
