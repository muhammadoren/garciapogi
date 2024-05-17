const axios = require('axios');
module.exports.config = {
  name: 'artic',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snowflakes', 'artic'],
  description: "An AI command powered by snowflakes",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'artic'. For example: 'artic What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://ai-1stclass-nemory-project.vercel.app/api/arctic?ask=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\n', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
