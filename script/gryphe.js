const axios = require('axios');

module.exports.config = {
  name: "gryphe",
  version: "1.0",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by OpenAI",
  aliases: ["ai"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const apiKey = 'O0ie1H0Qs24QLL3M6ECtRyGKuRY0kYlO';
  const query = encodeURIComponent(args.join(" "));
  const baseURL = 'https://api.deepinfra.com/v1/openai';
  
  try {
    const response = await axios.post(`${baseURL}/chat/completions`, {
        model: 'Gryphe/MythoMax-L2-13b',
        messages: [{ role: 'user', content: query }]
    }, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });

    const ans = response.data.choices[0].message.content;
    api.sendMessage(ans, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error.response.data);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
