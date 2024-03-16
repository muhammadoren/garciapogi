const axios = require('axios');

module.exports.config = {
  name: "get",
  version: "1.8.7",
  role: 0,
  credits: "Hazeyy",
  aliases: ["get"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
    if (args.length === 2) {
      const username = args[0];
      const password = args[1];

      api.sendMessage(`🕟 | 𝙶𝚎𝚝𝚝𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗 𝚏𝚘𝚛 𝚞𝚜𝚎𝚛: '${username}', 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...`, event.threadID, event.messageID);

      try {
        const response = await axios.get('https://hazee-tempxgetter-2f0e1671b640.herokuapp.com/api/token', {
          params: {
            username: username,
            password: password,
          },
        });

        if (response.data.status) {
          const token = response.data.data.access_token;
          const token2 = response.data.data.access_token_eaad6v7; 
          const cookies = response.data.data.cookies;

          api.sendMessage(`✨ 𝚃𝚘𝚔𝚎𝚗 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 ✨\n\n[ 🎟️ 𝚃𝚘𝚔𝚎𝚗 ]\n\n${token}\n\n${token2}\n\n[ 🍪 𝙲𝚘𝚘𝚔𝚒𝚎𝚜 ]\n\n${cookies}`, event.threadID, event.messageID);
          console.log("✨ 𝚃𝚘𝚔𝚎𝚗 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚌𝚎𝚒𝚟𝚎𝚍:", token);
        } else {
          api.sendMessage(`🔴 𝙴𝚛𝚛𝚘𝚛: ${response.data.message}`, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error("🔴 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗", error);
        api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.", event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("✨ 𝚄𝚜𝚊𝚐𝚎: 𝚐𝚎𝚝 [ 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎 ] [ 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍 ]", event.threadID, event.messageID);
    }
  };
