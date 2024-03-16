const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "style",
  version: "8.4",
  role: 0,
  credits: "Hazeyy",
  aliases: ["style"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage("🤖 𝙵𝚊𝚌𝚎 𝚂𝚝𝚢𝚕𝚎 𝚝𝚘 𝙼𝚊𝚗𝚢\n\n1. 𝙴𝚖𝚘𝚓𝚒\n2. 𝙿𝚒𝚡𝚎𝚕𝚜\n3. 𝙲𝚕𝚊𝚢\n4. 𝚃𝚘𝚢\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: 𝚂𝚝𝚢𝚕𝚎 >𝙿𝚒𝚡𝚎𝚕𝚜< >𝙿𝚛𝚘𝚖𝚙𝚝<", event.threadID, event.messageID);
    return;
  }

  const pathie = __dirname + `/cache/zombie.jpg`;
  const { threadID, messageID } = event;

  const photoUrl = event.messageReply.attachments[0] ? event.messageReply.attachments[0].url : args.join(" ");

  const validStyles = ["Emoji", "Pixels", "Clay", "Toy"];
  const style = args.shift().toLowerCase(); 
  if (!validStyles.includes(style.charAt(0).toUpperCase() + style.slice(1))) {
    api.sendMessage(`🤖 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚂𝚝𝚢𝚕𝚎 𝙲𝚑𝚘𝚒𝚌𝚎.\n\n𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙾𝚙𝚝𝚒𝚘𝚗𝚜 𝚊𝚛𝚎:\n\n${validStyles.join(", ")}`, threadID, messageID);
    return;
  }

  const prompt = args.join(" "); 

  api.sendMessage("🕟 | 𝚂𝚝𝚢𝚕𝚒𝚗𝚐 𝙸𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝..", threadID, async () => {
    try {
      const response = await axios.get(`https://hazee-face-to-many.replit.app/faces?image_url=${encodeURIComponent(photoUrl)}&style=${encodeURIComponent(style.charAt(0).toUpperCase() + style.slice(1))}&prompt=${encodeURIComponent(prompt)}`);
      const processedImageURL = response.data[0];
      const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

      fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

      api.sendMessage({
        body: "🤖 𝙷𝚎𝚛𝚎 𝚢𝚘𝚞 𝚐𝚘:",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);
    } catch (error) {
      api.sendMessage(`🚫 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎: ${error}`, threadID, messageID);
    }
  });
};
