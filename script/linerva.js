const axios = require('axios');

module.exports.config = {
  name: "linerva",
  version: "1.0",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "Talk to AI but not just a normal AI 🤭",
  aliases: ["ask"],
  cooldowns: 0,
};

async function liner(prompt) {
  const url = 'https://linerva.getliner.com/platform/copilot/v3/answer';
  const headers = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'Referer': 'https://getliner.com/',
  };
  const data = {
    spaceId: 18097491,
    threadId: "53007419",
    userMessageId: 59420219,
    userId: 8933542,
    query: prompt,
    agentId: '@liner-pro',
    platform: 'web',
    regenerate: false,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const respon = response.data.split('\n');
    const res = JSON.parse(respon[respon.length - 2]);
    return res.answer;
  } catch (error) {
    return error.message;
  }
}

module.exports.run = async function ({ api, event, args }) {
  let prompt = args.join(' ');
  if (!prompt) {
    api.sendMessage("Missing input!", event.threadID, event.messageID);
    return;
  }

  try {
    const reply = await liner(prompt);
    api.sendMessage(reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
