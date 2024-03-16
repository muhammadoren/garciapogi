const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "xnxx",
  version: "4.5",
  role: 0,
  credits: "Hazeyy",
  aliases: ["xnxx"], 
  cooldowns: 5,
  hasPrefix: false,
};

const apiUrl = "https://hazee-downloader.onrender.com/xnxx?url=";

module.exports.run = async function ({ api, event, args }) {
  try {
    const link = args[0];
    if (!link) {
      api.sendMessage("🤖 𝚄𝚜𝚊𝚐𝚎: 𝚡𝚗𝚡𝚡 »𝚕𝚒𝚗𝚔«", event.threadID);
      return;
    }
    api.sendMessage(`🕟 | 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...`, event.threadID, event.messageID);

    const isValidXnxxLink = checkXnxxLink(link);
    if (!isValidXnxxLink) {
      api.sendMessage("🤖 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚡𝚗𝚡𝚡 𝚕𝚒𝚗𝚔", event.threadID, event.messageID);
      return;
    }

    const response = await axios.get(`${apiUrl}${encodeURIComponent(link)}`);
    const videoUrl = response.data.result.url;
    const userName = response.data.result.keyword.split(',')[13];

    if (!videoUrl) {
      api.sendMessage("🤖 𝙽𝚘 𝚟𝚒𝚍𝚎𝚘 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚐𝚒𝚟𝚎𝚗 𝚕𝚒𝚗𝚔", event.threadID, event.messageID);
      return;
    }

    const videoResponse = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    const filePath = path.join(__dirname, "cache", "xnxx_video.mp4");
    videoResponse.data.pipe(fs.createWriteStream(filePath));

    videoResponse.data.on("end", () => {
      api.sendMessage(
        {
          attachment: fs.createReadStream(filePath),
          body: `🟢 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜.\n\n👤 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: @${userName}`,
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error("🚫 𝙴𝚛𝚛𝚘𝚛:", error);
    api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.", event.threadID);
  }
};

function checkXnxxLink(link) {
  const regex = /https?:\/\/(?:www\.)?xnxx\.com\/.*(?:\?|\&)video\/(\d+)/i;
  return regex.test(link);
}
