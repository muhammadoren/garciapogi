const axios = require("axios");

module.exports.config = {
  name: "Herc",
  version: "4.8",
  role: 0,
  credits: "shiki",
  aliases: ["herc", "v3"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage("🤖 Hello, I am Model hercv3 Created by hercai.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("🗨️ | Answering your question, Please wait...", event.threadID, event.messageID);

  const content = args.join(" ");
  axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(content)}`)
    .then(response => {
      if (response.data.reply) {
        const aiResponse = response.data.reply;
        api.sendMessage(aiResponse, event.threadID, event.messageID); // Sending the answer back to the chat
        // api.sendMessage(aiResponse, /* Replace this with your API endpoint */); // Sending the answer to your API
      } else {
        api.sendMessage("🤖 No response from hercv3 API", event.threadID, event.messageID);
      }
    })
    .catch(error => {
      console.error("🤖 Error:", error);
      api.sendMessage("🤖 An error occurred while processing your request, Please try again later.", event.threadID, event.messageID);
    });
};
