const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "DreamShaper",
  version: "3.1",
  role: 0,
  credits: "Hazeyy",
  aliases: ["dream", "Dream"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  const prompt = args.join(" ");

  api.setMessageReaction("📱", event.messageID, (err) => {}, true);

  if (!prompt) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙳𝚛𝚎𝚊𝚖𝚂𝚑𝚊𝚙𝚎𝚛\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝙳𝚛𝚎𝚊𝚖 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("🕟 | 𝙳𝚛𝚎𝚊𝚖𝚂𝚑𝚊𝚙𝚎𝚛 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

  try {
    const response = await axios.get('https://hazee-dalle-1ffcf6908a0c.herokuapp.com/dreamshaper/api', {
      params: {
        prompt: prompt,  
      },
    });

    if (response.data.output) {
      const imageData = response.data.output;

      const image = await axios.get(imageData, { responseType: "stream" });
      const path = __dirname + "/cache/" + Math.floor(Math.random() * 999999) + ".jpg";

      const writeStream = fs.createWriteStream(path);
      image.data.pipe(writeStream);

      writeStream.on('finish', () => {
        const promptMessage = `🤖 𝐃𝐫𝐞𝐚𝐦𝐒𝐡𝐚𝐩𝐞𝐫 ( 𝐀𝐈 )\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        api.sendMessage({ body: promptMessage, attachment: fs.createReadStream(path) }, event.threadID, () => {
          fs.unlinkSync(path);
        });
      });
    } else {
      api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙳𝚛𝚎𝚊𝚖𝚂𝚑𝚊𝚙𝚎𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.', event.threadID);
    }
  } catch (error) {
    console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.', event.threadID);
  }
};
