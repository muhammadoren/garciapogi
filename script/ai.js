const axios = require('axios');

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  credits: "shiki",
  hasPermission: 0,
  commandCategory: "utility",
  usage: "[ prefix ]pi [query]",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const query = args.join(" ");
    if (query) {
      const processingMessage = await api.sendMessage(`Searrching🔍. Please wait a moment...`, event.threadID);

      const response = await axios.get(`https://apis-samir.onrender.com/samirAi/web?prompt=${encodeURIComponent(query)}&uid=5`);

      if (response.data) {
        await api.sendMessage({ body: response.data.trim() }, event.threadID, event.messageID);
        console.log(`Sent 's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from  API`);
      }
      
      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get samirAi's response: ${error.message}`);
    api.sendMessage(`❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);
  }
};
