const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "Sdxl",
  version: "5.9",
  role: 0,
  credits: "Hazeyy",
  aliases: ["sdxl", "Sdxl"], 
  cooldowns: 10,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  const prompt = args.join(" ");  

  api.setMessageReaction("🖥️", event.messageID, (err) => {}, true);

  if (!prompt) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝚂𝙳𝚇𝙻\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚂𝚍𝚡𝚕 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("🕟 | 𝚂𝚍𝚡𝚕 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

  try {
    const response = await axios.get('https://hazee-dalle-1ffcf6908a0c.herokuapp.com/sdxl', {
      params: {
        prompt: prompt,  
      },
    });

   if (response.data.output) {
      const imageData = response.data.output;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const path = __dirname + "/cache/" + Math.floor(Math.random() * 999999) + ".jpg";

        const promptMessage = `🤖 𝐒𝐝𝐱𝐥 ( 𝐀𝐈 )\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(path, image.data);

        api.sendMessage({ body: promptMessage, attachment: fs.createReadStream(path) }, event.threadID, () => {
          fs.unlinkSync(path);
        });
      }
    } else {
      api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙳𝚊𝚕𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.', event.threadID, event.messageID);
  }
};
