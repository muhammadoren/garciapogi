const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "removebg",
  version: "3.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["removebg"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  
    let pathie = __dirname + `/cache/removed_bg.jpg`;
    const { threadID, messageID } = event;

    let photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

  if (!photoUrl) {
    api.sendMessage("📸 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚙𝚑𝚘𝚝𝚘 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚊𝚗𝚍 𝚛𝚎𝚖𝚘𝚟𝚎 𝚋𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍𝚜.", threadID, messageID);
    return;
  }
  
    api.sendMessage("🕟 | 𝚁𝚎𝚖𝚘𝚟𝚒𝚗𝚐 𝚋𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", threadID, async () => {
      try {
        const response = await axios.get(`https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/api/try/removebg?url=${encodeURIComponent(photoUrl)}`);
        const processedImageURL = response.data.image_data;

        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "✨ 𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚒𝚖𝚊𝚐𝚎 𝚠𝚒𝚝𝚑𝚘𝚞𝚝 𝚋𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍",
          attachment: fs.createReadStream(pathie)
                }, threadID, () => fs.unlinkSync(pathie), messageID);
              } catch (error) {
                api.sendMessage(`🚫 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎: ${error}`, threadID, messageID);
              }
            });
          };
