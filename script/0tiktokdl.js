const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "tiktok",
  version: "2.6",
  role: 0,
  credits: "Hazeyy",
  aliases: ["tik", "tiktok"], 
  cooldowns: 3,
  hasPrefix: false,
};

const apiUrl = "https://hazee-downloader.onrender.com/tiktok?url=";

module.exports.run = async function ({ api, event, args }) {

  try {
    const link = args[0];
    if (!link) {
      api.sendMessage("🤖 𝚄𝚜𝚊𝚐𝚎: 𝚝𝚒𝚔 »𝚕𝚒𝚗𝚔«", event.threadID, event.messageID);
      return;
    }
    api.sendMessage(`🕥 | 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐...`, event.threadID, event.messageID);

    const response = await axios.get(`${apiUrl}${encodeURIComponent(link)}`);

    const videoUrl = response.data.result.data.play;
    const userName = response.data.result.data.author.unique_id;

    if (!videoUrl) {
      api.sendMessage("🤖 𝙽𝚘 𝚟𝚒𝚍𝚎𝚘 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚐𝚒𝚟𝚎𝚗 𝚕𝚒𝚗𝚔.", event.threadID, event.messageID);
      return;
    }

    const videoResponse = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    const filePath = path.join(__dirname, "cache", "tiktok_video.mp4");
    videoResponse.data.pipe(fs.createWriteStream(filePath));

    videoResponse.data.on("end", () => {
      api.sendMessage(
        {
          attachment: fs.createReadStream(filePath),
          body: `🟢 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢\n\n👤 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: @${userName}`,
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error("🚫 𝙴𝚛𝚛𝚘𝚛:", error);
    api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.", event.threadID, event.messageID);
  }
};

