const axios = require('axios');
module.exports.config = {
  name: 'neurospike',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['neurospike', 'ai'],
  description: "An AI command powered by GPT-4",
  usage: "neurospike [promot]",
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
    api.sendMessage(`Please provide a question or statement after 'neurospike'. For example: 'neurospike What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://ai-1stclass-nemory-project.vercel.app/api/neuronspike?ask=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\n', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
