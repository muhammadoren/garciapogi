const path = require('path');
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports.config = {
  name: "Music",
  version: "3.8",
  role: 0,
  credits: "Hazeyy",
  aliases: ["music", "Music"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  const musicName = args.join(' ');
  if (!musicName) {
    api.sendMessage(`🎵 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚐𝚎𝚝 𝚜𝚝𝚊𝚛𝚝𝚎𝚍, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚖𝚞𝚜𝚒𝚌 » 𝚝𝚒𝚝𝚕𝚎 «`, event.threadID, event.messageID);
    return;
  }
  try {
    api.sendMessage(`🕟 | 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛 » ${musicName} «, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...`, event.threadID, event.messageID);
    const searchResults = await yts(musicName);
    if (!searchResults.videos.length) {
      return api.sendMessage("🚫 𝙲𝚊𝚗'𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚎 𝚜𝚎𝚊𝚛𝚌𝚑.", event.threadID, event.messageID);
    } else {
      const music = searchResults.videos[0];
      const musicUrl = music.url;
      const stream = ytdl(musicUrl, {
        filter: "audioonly"
      });
      const time = new Date();
      const timestamp = time.toISOString().replace(/[:.]/g, "-");
      const filePath = path.join(__dirname, 'cache', `${timestamp}_music.mp3`);
      stream.pipe(fs.createWriteStream(filePath));
      stream.on('response', () => {});
      stream.on('info', (info) => {});
      stream.on('end', () => {
        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('The file could not be sent because it is larger than 25MB.', event.threadID);
        }
        const message = {
          body: `🐱 𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚖𝚞𝚜𝚒𝚌.\n\n𝙽𝚊𝚖𝚎: '${music.title}'`,
          attachment: fs.createReadStream(filePath)
        };
        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        }, event.messageID);
      });
    }
  } catch (error) {
    api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚎𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.', event.threadID, event.messageID);
  }
};
