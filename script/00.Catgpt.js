const axios = require('axios');
const { Readable } = require("stream");
const fs = require("fs");

let FONT_ENABLED = true;

module.exports.config = {
  name: "CatGPT",
  version: "1.8.",
  role: 0,
  credits: "Hazeyy",
  aliases: ["cat"], 
  cooldowns: 3,
  hasPrefix: false,
};

const gifUrls = [
  "https://i.postimg.cc/XJPKW6ZM/download-1.gif",
"https://i.postimg.cc/wjqLPQFY/Animated-Cat-Gifs-in-the-Sketch-Style-1-1-1.gif",
  "https://i.postimg.cc/sxns2yFc/2ilN-1.gif",
];

function getRandomGifUrl() {
  return gifUrls[Math.floor(Math.random() * gifUrls.length)];
}

const getRandomCatFact = async () => {
  try {
    const response = await axios.get('https://hazee-catfact-71f07253192f.herokuapp.com/catfact/api');
     return response.data.catFact;
  } catch (error) {
    console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙲𝚊𝚝𝙵𝚊𝚌𝚝:', error);
    throw new Error('🐱 𝚄𝚗𝚊𝚋𝚕𝚎 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝙲𝚊𝚝𝙵𝚊𝚌𝚝 𝚊𝚝 𝚝𝚑𝚎 𝚖𝚘𝚖𝚎𝚗𝚝.');
  }
};

const sendGifAttachment = async function (api, gifUrl, formattedReply, threadID, messageID, question) {
  try {
    const catFact = await getRandomCatFact();
    const formattedCatFact = formatFont(catFact);

    const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    const gifBuffer = Buffer.from(response.data);
    const path = __dirname + '/cache/' + Math.floor(Math.random() * 99999999) + '.gif';
    await fs.promises.writeFile(path, gifBuffer);
    const gifStream = fs.createReadStream(path);

    api.sendMessage(
      {
        body: `🐱 𝐂𝐚𝐭𝐆𝐏𝐓 ( 𝐀𝐈 )\n\n🗨️ 𝐌𝐞𝐨𝐰: '${question}'\n\n${formattedReply}\n\n🐱 𝐂𝐚𝐭 𝐅𝐚𝐜𝐭𝐬\n\n» ${formattedCatFact} «`,
        attachment: gifStream,
      },
      threadID,
      messageID
    );
  } catch (error) {
    console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙲𝚊𝚝𝙶𝙿𝚃 𝙶𝚒𝚏:', error.message);
    api.sendMessage(
      {
        body: '🐱 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚎𝚜𝚒𝚗𝚐 𝙲𝚊𝚝𝙶𝙿𝚃 𝚖𝚎𝚜𝚜𝚊𝚐𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.',
      },
      threadID,
      messageID
    );
  }
};

async function convertVoiceToText(audioUrl, api, event) {
  try {
    api.sendMessage("🐈 | 𝙲𝚊𝚝𝙶𝙿𝚃 𝙰𝙸 𝙲𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝙰𝚞𝚍𝚒𝚘, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

    const response = await axios.get(`https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/api/try/voice2text?url=${encodeURIComponent(audioUrl)}`);
    const text = response.data.transcription;

    if (text && FONT_ENABLED) {
      const formattedText = formatFont(text);
      api.sendMessage(`🐱 𝐂𝐚𝐭𝐆𝐏𝐓 ( 𝐀𝐈 ) 𝐂𝐨𝐧𝐓𝐞𝐱𝐭 🎶\n\n ${formattedText}`, event.threadID, event.messageID);
    } else if (text) {
      api.sendMessage(`🐱 𝐂𝐚𝐭𝐆𝐏𝐓 ( 𝐀𝐈 ) 𝐂𝐨𝐧𝐓𝐞𝐱𝐭 🎶\n\n ${text}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🐱 𝙲𝚊𝚝𝙶𝙿𝚃 𝚒𝚜 𝚄𝚗𝚊𝚋𝚕𝚎 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚊𝚞𝚍𝚒𝚘.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🐱 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝙲𝚊𝚝𝙶𝙿𝚃 𝚊𝚞𝚍𝚒𝚘:", error);
    api.sendMessage("🐱 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝙲𝚊𝚝𝙶𝙿𝚃 𝙰𝚞𝚍𝚒𝚘 𝙰𝙿𝙸 𝚘𝚛 𝚖𝚎𝚜𝚜𝚊𝚐𝚎\n\n» https://www.facebook.com/Hazeyy0 « 𝚝𝚘 𝚏𝚒𝚡 𝚝𝚑𝚒𝚜 𝙰𝙿𝙸 𝚛𝚒𝚐𝚑𝚝 𝚊𝚠𝚊𝚢...", event.threadID, event.messageID);
  }
}

module.exports.run = async function ({ api, event, args }) {

if (event.type === "message_reply") {
    if (event.messageReply.attachments[0]) {
      const attachment = event.messageReply.attachments[0];

      if (attachment.type === "audio") {
        const audioUrl = attachment.url;
        convertVoiceToText(audioUrl, api, event);  
        return;
      }
    }
  }

  const lowerCaseBody = event.body.toLowerCase();

  if (lowerCaseBody.startsWith("cat on")) {
    FONT_ENABLED = true;
    api.sendMessage({
      body: `🐱 𝐂𝐚𝐭𝐆𝐏𝐓 ( 𝐀𝐈 )\n\n» 🟢 𝙵𝚘𝚗𝚝 𝙴𝚗𝚊𝚋𝚕𝚎𝚍 «`,
      attachment: null,
      mentions: [],
    }, event.threadID, event.messageID);
    return;
  }

  if (lowerCaseBody.startsWith("cat off")) {
    FONT_ENABLED = false;
    api.sendMessage({
      body: `🐱 𝐂𝐚𝐭𝐆𝐏𝐓 ( 𝐀𝐈 )\n\n» 🔴 𝙵𝚘𝚗𝚝 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 «`,
      attachment: null,
      mentions: [],
    }, event.threadID, event.messageID);
    return;
  }

  if (args.length === 0) {
    api.sendMessage("🐱 𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝙲𝚊𝚝𝙶𝙿𝚃 𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝚋𝚢 ฮาซีย์\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?", event.threadID, event.messageID);
    return;
  }

  let question = args.join(" ");

  try {
    api.sendTypingIndicator(event.threadID);

    api.sendMessage("🐈 | 𝙼𝚎𝚘𝚠 𝚖𝚎𝚘𝚠𝚠...", event.threadID, event.messageID);

    const response = await axios.get(`https://haze-catgpt-e816e47d481e.herokuapp.com/catgpt/api?content=${encodeURIComponent(question)}`);

    const reply = response.data.reply;

    if (reply.trim() !== "") {
      const formattedReply = formatFont(reply);

      const gifUrl = getRandomGifUrl();
      sendGifAttachment(api, gifUrl, formattedReply, event.threadID, event.messageID, question);
    } else {
      api.sendMessage("🐱 𝙲𝚊𝚝𝙶𝙿𝚃 𝚌𝚘𝚞𝚕𝚍𝚗'𝚝 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚝𝚘 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚛𝚢.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🐱 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝙲𝚊𝚝𝙶𝙿𝚃 𝙰𝙿𝙸 𝚘𝚛 𝚖𝚎𝚜𝚜𝚊𝚐𝚎\n\n» https://www.facebook.com/Hazeyy0 « 𝚝𝚘 𝚏𝚒𝚡 𝚝𝚑𝚒𝚜 𝙰𝙿𝙸 𝚛𝚒𝚐𝚑𝚝 𝚊𝚠𝚊𝚢...", event.threadID, event.messageID);
  }
};

function formatFont(text) {
  const FONT_MAPPING = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedOutput = "";
  for (const char of text) {
    if (FONT_ENABLED && char in FONT_MAPPING) {
      formattedOutput += FONT_MAPPING[char];
    } else {
      formattedOutput += char;
    }
  }

  return formattedOutput;
}
