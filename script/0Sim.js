const axios = require("axios");
const googleTTS = require("google-tts-api");
const fs = require("fs");

let thread = {};
let invoices = {};

module.exports.config = {
  name: "sim",
  version: "1.1",
  role: 0,
  credits: "Hazeyy",
  aliases: ["sim"], 
  cooldowns: 3,
  hasPrefix: false,
};

async function sendVoiceInvoice(api, threadID, recipient) {
  try {
    const invoiceText = `${recipient}, `;

    const ttsURL = googleTTS.getAudioUrl(invoiceText, {
      lang: "tl",
      slow: false,
      host: "https://translate.google.com",
    });

    const { data } = await axios.get(ttsURL, { responseType: "arraybuffer" });
    let path = __dirname + "/cache/" + Math.floor(Math.random() * 99999) + ".mp3";
    fs.writeFileSync(path, data);

    const response = await api.sendMessage(
      { attachment: fs.createReadStream(path) },
      threadID, () => {
        fs.unlinkSync(path);
      }
    );

    return response;
  } catch (error) {
    console.error("🔴 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚘𝚒𝚌𝚎:", error);
    return null;
  }
}

module.exports.run = async function ({ api, event, args }) {

    if (args.length === 0) {
      return api.sendMessage("😺 𝙷𝚎𝚕𝚕𝚘 𝚙𝚕𝚎𝚊𝚜𝚎 𝚙𝚞𝚝 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚘 𝚝𝚊𝚕𝚔 𝚠𝚒𝚝𝚑 𝚂𝚒𝚖.", event.threadID, event.messageID);
    }

    switch (args[0].toLowerCase()) {
      case 'on':
        thread[event.threadID] = true;
        return api.sendMessage("🤖 𝐒𝐢𝐦 ( 𝐀𝐈 )\n\n» 🟢 𝙴𝚗𝚊𝚋𝚕𝚎𝚍 «", event.threadID, event.messageID);
      case 'off':
        thread[event.threadID] = false;
        return api.sendMessage("🤖 𝐒𝐢𝐦 ( 𝐀𝐈 )\n\n» 🔴 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 «", event.threadID, event.messageID);
      case 'voice':
        if (args.length < 3) {
          return api.sendMessage("😿 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚟𝚘𝚒𝚌𝚎 𝚏𝚘𝚛𝚖𝚊𝚝.\n\n 𝚄𝚜𝚊𝚐𝚎: 𝚂𝚒𝚖 𝚟𝚘𝚒𝚌𝚎 [ 𝚝𝚎𝚡𝚝 ] [ 𝚊𝚖𝚘𝚞𝚗𝚝 ]", event.threadID, event.messageID);
        }

        const recipient = args[1];
        const amount = args[2];

        const invoice = {
          recipient,
          amount,
          senderID: event.senderID,
        };
        invoices[event.threadID] = invoice;

        return sendVoiceInvoice(api, event.threadID, recipient, amount);
      default:
        let text = args.join(" ");
        api.sendMessage("🗨️ | 𝚂𝚒𝚖 𝚒𝚜 𝚝𝚢𝚙𝚒𝚗𝚐, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);
        try {
          let { data } = await axios.post("https://hazee-sim-4601eff24780.herokuapp.com/ask", { ask: text, id: event.senderID });
          if (data.success == true) {
            const simSimiResponse = `───※ ·❆· ※───\n\n👤 𝐔𝐬𝐞𝐫: '${text}'\n\n───※ ·❆· ※───\n\n🤖 𝐒𝐢𝐦 𝐑𝐞𝐬𝐩𝐨𝐧𝐝:\n\n${data.answer}\n\n───※ ·❆· ※───`;
            setTimeout(() => {             api.sendMessage(simSimiResponse, event.threadID, event.messageID);
            }, 6000);
          } else {
            api.sendMessage("🚫 𝚄𝚗𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍 𝙴𝚛𝚛𝚘𝚛: 𝚆𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚏𝚛𝚘𝚖 𝚂𝚒𝚖 𝙰𝙿𝙸.", event.threadID, event.messageID);
          }
        } catch {
          api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚌𝚘𝚖𝚖𝚞𝚗𝚒𝚌𝚊𝚝𝚒𝚗𝚐 𝚠𝚒𝚝𝚑 𝚂𝚒𝚖 𝙰𝙿𝙸.", event.threadID, event.messageID);
        }
    }
};
