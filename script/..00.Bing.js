const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "Bing",
  version: "10.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["bing", "Bing"], 
  cooldowns: 30,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage("🐱 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙱𝚒𝚗𝚐 𝙳𝚊𝚕𝚕𝚎\n\n 𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝙱𝚒𝚗𝚐 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);
    return;
  }

    try {
        const prompt = args.join(" ");

        api.sendMessage("🕟 | 𝙱𝚒𝚗𝚐 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚙𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

        const url = `https://hazee-bing-7ad593c7e1e1.herokuapp.com/bing/dalle?query=${encodeURIComponent(prompt)}`;

        const response = await axios.get(url);
        const data = response.data;

        const imgData = [];

        for (let i = 0; i < data.images.length; i++) {
            const imgUrl = data.images[i].url;
            const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
            await fs.outputFile(imgPath, imgResponse.data);
            imgData.push(fs.createReadStream(imgPath));
        }

        await api.sendMessage({
            body: `🤖 𝐁𝐢𝐧𝐠 ( 𝐀𝐈 )\n\n𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚙𝚛𝚘𝚖𝚙𝚝:`,
            attachment: imgData
        }, event.threadID, event.messageID);

    } catch (error) {
        console.error(error);
        await api.sendMessage(`🤖 𝙱𝚒𝚗𝚐 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚘𝚗 𝚏𝚊𝚒𝚕𝚎𝚍!\n\n𝙴𝚛𝚛𝚘𝚛: ${error.message}`, event.threadID);
    }
};
