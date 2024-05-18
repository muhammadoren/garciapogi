const axios = require('axios');

function randomChars(int) {
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < int; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

module.exports.config = {
  name: "claude",
  version: "1.0",
  role: 0,
  hasPrefix: false,
  credits: "lester navarra",
  description: "Interacts with PinoyGPT API",
  aliases: ["pgpt"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  try {
    if (!args[0]) {
      api.sendMessage("Please provide a message.", event.threadID, event.messageID);
      return;
    }

    let r1 = await axios.get('https://www.pinoygpt.com/');
    let sessionCookie = r1.headers['set-cookie'][0];
    let r2 = await axios.post(
      'https://www.pinoygpt.com/wp-json/mwai-ui/v1/chats/submit',
      {
        'botId': 'default',
        'customId': randomChars(32),
        'session': 'N/A',
        'chatId': randomChars(12),
        'contextId': Math.floor(Math.random() * 99) + 1,
        'messages': [],
        'newMessage': args.join(" "),
        'newFileId': null,
        'stream': true
      },
      {
        headers: {
          'cookie': sessionCookie,
          'x-wp-nonce': '2fe6c653a2'
        }
      }
    );
    let arr = r2.data.match(/"data":"(.*?)"/g).join().match(/:"(.*?)"/g).map(e=>e.replace(/[:"]/g,''));
    arr.pop();
    let response = arr.join('');
    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
