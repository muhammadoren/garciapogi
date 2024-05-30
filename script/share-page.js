const axios = require('axios');

module.exports.config = {
  name: "share-page",
  version: "1.0",
  role: 0,
  credits: "shiki",
  aliases: ["boost"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    if (args.length !== 3) {
      api.sendMessage('🤖 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚗𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚊𝚛𝚐𝚞𝚖𝚎𝚗𝚝𝚜.\n\n𝚄𝚜𝚊𝚐𝚎: 𝙱𝚘𝚘𝚜𝚝 [ 𝚃𝚘𝚔𝚎𝚗 ] [ 𝙻𝚒𝚗𝚔 ] [ 𝙰𝚖𝚘𝚞𝚗𝚝 ] ', event.threadID);
      return;
    }

    const accessToken = args[0];
    const shareUrl = args[1];
    const numberOfShares = parseInt(args[2]);

    if (isNaN(numberOfShares) || numberOfShares <= 0) {
      api.sendMessage('🤖 𝙽𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚜𝚑𝚊𝚛𝚎𝚜 𝚜𝚑𝚘𝚞𝚕𝚍 𝚋𝚎 𝚊 𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚎 𝚒𝚗𝚝𝚎𝚐𝚎𝚛.', event.threadID);
      return;
    }

    // Fetch page tokens using the provided API
    const apiUrl = `https://page-share.onrender.com/getPageToken?token=${accessToken}&count=${numberOfShares}&link=${encodeURIComponent(shareUrl)}`;

    try {
      const apiResponse = await axios.get(apiUrl);
      const { message, count } = apiResponse.data;

      if (message === "Page tokens retrieved successfully" && count > 0) {
        api.sendMessage(`🌐 𝙿𝚘𝚜𝚝 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚜𝚑𝚊𝚛𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚏𝚘𝚛 ${count} 𝚝𝚒𝚖𝚎𝚜.`, event.threadID);
      } else {
        api.sendMessage("🚫 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚎 𝚙𝚊𝚐𝚎 𝚝𝚘𝚔𝚎𝚗𝚜.", event.threadID);
      }
    } catch (error) {
      api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚙𝚊𝚐𝚎 𝚝𝚘𝚔𝚎𝚗𝚜: " + error.message, event.threadID);
    }
  } catch (error) {
    api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚑𝚊𝚗𝚍𝚕𝚒𝚗𝚐 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍: " + error.message, event.threadID);
  }
};
