const axios = require('axios');

module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gemini', 'bard'],
  description: "An AI command powered by Gemini",
  usage: "gemini [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'bard'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  
  try {
    const { data } = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(input)}`);
    const response = data.reply; // Accessing the 'reply' field from the JSON response
    api.sendMessage(response + '\n\n', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
