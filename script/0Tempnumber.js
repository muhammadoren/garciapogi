const axios = require("axios");

module.exports.config = {
  name: "tempnumber",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["tempnumber"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length === 0) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝚑𝚎𝚛𝚎 𝚊𝚛𝚎 𝚝𝚑𝚎 𝚕𝚒𝚜𝚝 𝚌𝚘𝚞𝚗𝚝𝚛𝚒𝚎𝚜 𝚝𝚘 𝚚𝚞𝚎𝚛𝚢 𝚗𝚞𝚖𝚋𝚎𝚛𝚜:\n\n'1', 𝚄𝚗𝚒𝚝𝚎𝚍 𝚂𝚝𝚊𝚝𝚎𝚜\n'+1', 𝙲𝚊𝚗𝚊𝚍𝚊\n'+44', 𝚄𝚗𝚒𝚝𝚎𝚍 𝙺𝚒𝚗𝚐𝚍𝚘𝚖\n'+45', 𝙳𝚎𝚗𝚖𝚊𝚛𝚔\n'+63', 𝙿𝚑𝚒𝚕𝚒𝚙𝚙𝚒𝚗𝚎𝚜\n'+34', 𝚂𝚙𝚊𝚒𝚗\n'+380', 𝚄𝚔𝚛𝚊𝚒𝚗𝚎\n'+972', 𝙸𝚜𝚛𝚊𝚎𝚕\n'+230', 𝙼𝚊𝚞𝚛𝚒𝚝𝚒𝚞𝚜\𝚗'+91', 𝙸𝚗𝚍𝚒𝚊\n'+385', 𝙲𝚛𝚘𝚊𝚝𝚒𝚊\n'+212', 𝙼𝚘𝚛𝚘𝚌𝚌𝚘\n'+84', 𝚅𝚒𝚎𝚝 𝙽𝚊𝚖\n'+52', 𝙼𝚎𝚡𝚒𝚌𝚘\n'+359', 𝙱𝚞𝚕𝚐𝚊𝚛𝚒𝚊\n'+351', 𝙿𝚘𝚛𝚝𝚞𝚐𝚊𝚕\n'+40', 𝚁𝚘𝚖𝚊𝚗𝚒𝚊\n'+55', 𝙱𝚛𝚊𝚣𝚒𝚕\n'+234', 𝙽𝚒𝚐𝚎𝚛𝚒𝚊\n\n𝚄𝚜𝚊𝚐𝚎: 𝚝𝚎𝚖𝚙𝚗𝚞𝚖𝚋𝚎𝚛 𝚐𝚎𝚝 [ 𝚌𝚘𝚍𝚎 ], 𝚄𝚜𝚎: 𝚒𝚗𝚋𝚘𝚡 [ 𝚌𝚘𝚍𝚎 ] > [ number ]", event.threadID, event.messageID);
    return;
  }

  const command = args[0];

  if (command === "get") {
    const countryCode = args[1];
    try {
      const response = await axios.get(`https://haze-tempnum-8302cd0a11e5.herokuapp.com/temp/number?countryCode=${countryCode}`);
      const data = response.data.data.join("\n"); 
      if (data.length > 0) {
        api.sendMessage(`📓 𝐓𝐞𝐦𝐩 𝐍𝐮𝐦𝐛𝐞𝐫𝐬:\n\n${data}`, event.threadID, event.messageID);
      } else {
        api.sendMessage("🔴 𝙽𝚘 𝚝𝚎𝚖𝚙𝚘𝚛𝚊𝚛𝚢 𝚗𝚞𝚖𝚋𝚎𝚛𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚏𝚘𝚛 𝚝𝚑𝚒𝚜 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("🚫 𝙴𝚛𝚛𝚘𝚛", error);
      api.sendMessage("🚫 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚝𝚎𝚖𝚙𝚘𝚛𝚊𝚛𝚢 𝚗𝚞𝚖𝚋𝚎𝚛𝚜.", event.threadID, event.messageID);
    }
  } else if (command === "inbox") {
    const countryCode = args[1];
    const phoneNumber = args.slice(2).join("");
    try {
      const response = await axios.get(`https://haze-tempnum-8302cd0a11e5.herokuapp.com/inbox?countryCode=${countryCode}&phoneNumber=${phoneNumber}`);
      if (response.data && response.data.data) {
        const data = response.data.data; 
        if (data.length > 0) {
          api.sendMessage(`📩 𝐈𝐧𝐛𝐨𝐱 𝐂𝐨𝐝𝐞𝐬:\n\n𝐂𝐨𝐮𝐧𝐭𝐫𝐲 𝐂𝐨𝐝𝐞: '${countryCode}'\n𝐏𝐡𝐨𝐧𝐞 𝐍𝐮𝐦𝐛𝐞𝐫: '${phoneNumber}'\n\n${JSON.stringify(data)}`, event.threadID, event.messageID);
        } else {
          api.sendMessage("🔴 𝙽𝚘 𝚒𝚗𝚋𝚘𝚡 𝚌𝚘𝚍𝚎𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚏𝚘𝚛 𝚝𝚑𝚒𝚜 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎 𝚊𝚗𝚍 𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛.", event.threadID, event.messageID);
        }
      } else {
        api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("🚫 𝙴𝚛𝚛𝚘𝚛", error);
      api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍.", event.threadID, event.messageID);
    }
  }
};
