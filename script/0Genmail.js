const axios = require("axios");

module.exports.config = {
  name: "genmail",
  version: "1.6",
  role: 0,
  credits: "Hazeyy",
  aliases: ["genmail"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args[0] === "gen") {
    try {
      const response = await axios.get("https://hazee-tempxgetter-2f0e1671b640.herokuapp.com/get");
      const responseData = JSON.stringify(response.data, null, 2);
      api.sendMessage(`» 𝐓𝐄𝐌𝐏𝐌𝐀𝐈𝐋 📧 «\n\n ${responseData} `, event.threadID, event.messageID);
    } catch (error) {
      console.error("🚫 𝙴𝚛𝚛𝚘𝚛", error);
      api.sendMessage("🚫 𝚄𝚗𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍 𝙴𝚛𝚛𝚘𝚛, 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚎𝚖𝚊𝚒𝚕 𝚊𝚍𝚍𝚛𝚎𝚜𝚜.", event.threadID);
    }
  } else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
    const email = args[1];
    try {
      const response = await axios.get(`https://hazee-tempxgetter-2f0e1671b640.herokuapp.com/get/${email}`);
      const inboxMessages = response.data;
      api.sendMessage(`» 𝐈𝐍𝐁𝐎𝐗 📩 «\n\n${JSON.stringify(inboxMessages, null, 2)}`, event.senderID);
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      api.sendMessage(`» 𝐈𝐍𝐁𝐎𝐗 📩 «\n\n𝙼𝚎𝚜𝚜𝚊𝚐𝚎 𝚜𝚎𝚗𝚝 𝚙𝚛𝚒𝚟𝚊𝚝𝚎𝚕𝚢. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚖𝚎𝚜𝚜𝚊𝚐𝚎𝚜 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚗𝚋𝚘𝚡 𝚎𝚖𝚊𝚒𝚕 𝚌𝚘𝚍𝚎.`, event.threadID, event.messageID);
    } catch (error) {
      console.error("🚫 𝙴𝚛𝚛𝚘𝚛", error);
      api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍.", event.senderID);
    }
  } else {
  }
}; 
