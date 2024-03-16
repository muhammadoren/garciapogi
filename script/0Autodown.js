const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "Autodl",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["auto"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  if (this.checkLink(event.body)) {
    var { type, url } = this.checkLink(event.body);
    this.download(url, type, api, event);
  }
};

module.exports.download = function (url, type, api, event) {
  var time = Date.now();
  var path = __dirname + `/cache/${time}.${type}`;
  this.getLink(url).then(res => {
    if (type == 'mp4') url = res.result.video.hd || res.result.video.sd || res.result.video.nowatermark || res.result.video.watermark;
    else if (type == 'mp3') url = res.result.music.play_url;

    api.sendMessage("💽 | 𝙰𝚞𝚝𝚘-𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID, (err, messageInfo) => {
      axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
      }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        if (fs.statSync(path).size / 1024 / 1024 > 25) {
          api.sendMessage("🤖 𝚂𝚘𝚛𝚛𝚢 𝚝𝚑𝚎 𝚏𝚒𝚕𝚎 𝚒𝚜 𝚝𝚘𝚘 𝚋𝚒𝚐 𝚝𝚘 𝚜𝚎𝚗𝚍, 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛", event.threadID, event.messageID, (err) => {
            fs.unlinkSync(path);
          });
        } else {
          api.sendMessage(
            {
              body: "💿 𝙳𝚘𝚠𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎...\n\n𝙷𝚎𝚛𝚎\'𝚜 𝚢𝚘𝚞𝚛 𝚟𝚒𝚍𝚎𝚘",
              attachment: fs.createReadStream(path),
            },
            event.threadID,
            (err) => {
              fs.unlinkSync(path);
            }
          );
        }
      }).catch(err => {
        console.log(err);
        api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚝𝚑𝚎 𝚏𝚒𝚕𝚎.", event.threadID, event.messageID);
      });
    });
  }).catch(err => {
    console.log(err);
    api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚝𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚕𝚒𝚗𝚔.", event.threadID, event.messageID);
  });
};

module.exports.getLink = function (url) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `https://nguyenmanh.name.vn/api/autolink?url=${url}&apikey=pNKvedtJ`,
    })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

module.exports.checkLink = function (url) {
  const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
  const found = url.match(regex);
  var media = ['tiktok', 'facebook', 'douyin', 'youtube', 'youtu', 'twitter', 'instagram', 'kuaishou', 'fb'];
  if (this.isValidUrl(String(found))) {
    if (media.some(item => String(found).includes(item))) {
      return {
        type: "mp4",
        url: String(found),
      };
    } else if (String(found).includes("soundcloud") || String(found).includes("zingmp3")) {
      return {
        type: "mp3",
        url: String(found),
      };
    }
  }
  return false;
};

module.exports.isValidUrl = function (url) {
  var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (url.match(regex) == null) return false;
  return true;
};
