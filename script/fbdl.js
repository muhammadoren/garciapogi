const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "fbdl",
  version: "1.0",
  role: 0,
  credits: "shiki",
  aliases: ["fb", "facebook"], 
  cooldowns: 3,
  hasPrefix: false,
};

const apiUrl = "https://hoanghao.me/api/facebook/download?url=";

module.exports.run = async function ({ api, event, args }) {

  try {
    const link = args[0];
    if (!link) {
      api.sendMessage("🤖 Usage: fbdl »link«", event.threadID, event.messageID);
      return;
    }
    api.sendMessage(`🕥 | Downloading...`, event.threadID, event.messageID);

    const response = await axios.get(`${apiUrl}${encodeURIComponent(link)}`);

    const videoUrl = response.data.data.video;
    const description = response.data.data.description;

    if (!videoUrl) {
      api.sendMessage("🤖 No video found for the given link.", event.threadID, event.messageID);
      return;
    }

    const videoResponse = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    const filePath = path.join(__dirname, "cache", "facebook_video.mp4");
    videoResponse.data.pipe(fs.createWriteStream(filePath));

    videoResponse.data.on("end", () => {
      api.sendMessage(
        {
          attachment: fs.createReadStream(filePath),
          body: `🟢 Download Successful\n\n📝 Description: ${description}`,
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error("🚫 Error:", error);
    api.sendMessage("🤖 An error occurred while processing request.", event.threadID, event.messageID);
  }
};
