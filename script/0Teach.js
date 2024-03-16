const axios = require("axios");
let teachingCount = 376562;

module.exports.config = {
  name: "teach",
  version: "1.4",
  role: 0,
  credits: "Hazeyy",
  aliases: ["teach"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) return api.sendMessage("😺 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚞𝚝 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚘 𝚝𝚎𝚊𝚌𝚑 𝚂𝚒𝚖.", event.threadID, event.messageID);
  let text = args.join(" ");
  let data = text.split(">");
  let ask = (typeof data[0] !== "undefined") ? data[0].trim() : data[0];
  let answer = (typeof data[1] !== "undefined") ? data[1].trim() : data[1];

  if (!text.includes(">") || data.length === 1 || typeof answer === "undefined" || answer === "" || typeof ask === "undefined" || ask === "") return api.sendMessage(`😾 𝚆𝚛𝚘𝚗𝚐 𝚠𝚊𝚢 𝚘𝚏 𝚝𝚎𝚊𝚌𝚑\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: ${global.config.PREFIX}${this.config.name} 𝙷𝚎𝚕𝚕𝚘 > 𝙷𝚎𝚕𝚕𝚘 𝚍𝚒𝚗 𝚙𝚘\n\n𝙰𝚜𝚔: 𝙷𝚎𝚕𝚕𝚘\n𝙰𝚗𝚜𝚠𝚎𝚛: 𝙷𝚎𝚕𝚕𝚘 𝚍𝚒𝚗 𝚙𝚘`, event.threadID, event.messageID);

  try {
    let { data } = await axios.post("https://hazee-sim-4601eff24780.herokuapp.com/teach", { ask: ask, answer: answer, id: event.senderID });

    if (data.success == true) {
      teachingCount++;
      return api.sendMessage(`───※ ·❆· ※───\n\n🗨️ 𝚃𝚎𝚊𝚌𝚑: ${ask}\n💬 𝙰𝚗𝚜𝚠𝚎𝚛: ${answer}\n\n𝚃𝚑𝚊𝚗𝚔𝚢𝚘𝚞 𝚏𝚘𝚛 𝚝𝚎𝚊𝚌𝚑𝚒𝚗𝚐 𝚂𝚒𝚖 🐱\n\n𝚃𝚎𝚊𝚌𝚑𝚒𝚗𝚐 𝙲𝚘𝚞𝚗𝚝: '${teachingCount}'\n\n───※ ·❆· ※───`, event.threadID, event.messageID);
    } else {
      return api.sendMessage("😿 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍", event.threadID, event.messageID);
    }
  } catch {
    return api.sendMessage("😿 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍", event.threadID, event.messageID);
  }
};
