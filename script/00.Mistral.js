const axios = require('axios');
const fs = require('fs');

const fontMapping = {
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
  n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
  A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
  N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
};

function formatFont(text) {
  let formattedText = '';
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}

async function handleMistralCommand(api, event) {
    const args = event.body.split(/\s+/);
  args.shift();
  const prompt = args.join(' ');

  if (!prompt) {
    return api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝚊 𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎 𝚖𝚘𝚍𝚎𝚕 𝚝𝚛𝚊𝚒𝚗𝚎𝚍 𝚋𝚢 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸.\n\n𝚄𝚜𝚎: 𝚖𝚒𝚜𝚝𝚛𝚊𝚕 [ 𝚚𝚞𝚎𝚛𝚢 ] 𝚊𝚗𝚍 𝚏𝚘𝚛 𝚊𝚞𝚍𝚒𝚘, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚊𝚞𝚍𝚒𝚘 𝚒𝚏 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚊𝚞𝚍𝚒𝚘 𝚒𝚗𝚝𝚘 𝚊 𝚝𝚎𝚡𝚝", event.threadID, event.messageID);
  }

  api.sendMessage("🗨️ | 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/api/mistral/response?prompt=${prompt}`);
    if (response.data.hasOwnProperty("error")) {
      return api.sendMessage(response.data.error, event.threadID, event.messageID);
    }
    const generatedText = formatFont(response.data.response).trim();
    const senderName = "🐾 𝐌𝐢𝐬𝐭𝐫𝐚𝐥 ( 𝐀𝐈 )";
    const message = `${senderName}\n\n🖋️ 𝐀𝐬𝐤: '${prompt}'\n\n${generatedText}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎.", event.threadID);
  }
}

async function generateFlameGif(api, event, text) {
  if (!text) {
    return api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝚠𝚒𝚝𝚑 𝙶𝚒𝚏, \n\n𝚄𝚜𝚎: 𝚖𝚒𝚜𝚝𝚐𝚒𝚏 [ 𝚝𝚎𝚡𝚝 ] 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚝𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝚐𝚒𝚏.", event.threadID, event.messageID);
  }

  api.sendMessage("🕟 | 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚝𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝚐𝚒𝚏, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

  try {
    const url = `https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/api/gen/flame?text=${text}`;
    const response = await axios.get(url, { responseType: "stream" });
    const data = response.data;
    let path = __dirname + "/cache/" + Math.floor(Math.random() * 9999999) + ".gif";
    await new Promise((resolve) => {
      data.pipe(fs.createWriteStream(path)).on("close", resolve);
    });

    if (fs.existsSync(path)) {
      const combinedMessage = {
        body: "🐾 𝐌𝐢𝐬𝐭𝐫𝐚𝐥 ( 𝐀𝐈 )\n\n𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚍 𝚃𝚎𝚡𝚝 𝚒𝚗𝚝𝚘 𝙶𝚒𝚏!",
        attachment: fs.createReadStream(path),
      };

      api.sendMessage(combinedMessage, event.threadID);
    } else {
      api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚖𝚒𝚜𝚝𝚐𝚒𝚏.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚖𝚒𝚜𝚝𝚐𝚒𝚏..", event.threadID);
  }
}

async function handleFlameGifCommand(api, event) {
  const args = event.body.split(/\s+/);
  args.shift();
  const text = args.join(" ");
  await generateFlameGif(api, event, text);
}

async function handleMistralImageCommand(api, event) {
  const args = event.body.split(/\s+/);
  args.shift();
  const tzt = args.join(' ').split('-').map(item => item.trim());
  const txt = tzt[0];
  const txt2 = tzt.slice(1).join(' ');  

  if (!txt || !txt2) {
    return api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘, 𝚝𝚘 𝚞𝚜𝚎 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝚠𝚒𝚝𝚑 𝚒𝚖𝚊𝚐𝚎 𝚙𝚛𝚘𝚖𝚙𝚝.\n\n𝚄𝚜𝚎: 𝚖𝚒𝚜𝚝𝚖𝚊𝚐𝚎 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ] - [ 𝚖𝚘𝚍𝚎𝚕 ] 𝚊𝚗𝚍 𝚌𝚑𝚘𝚘𝚜𝚎 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 1-20.", event.threadID, event.messageID);
  }

  api.sendMessage("🕤 | 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚙𝚛𝚘𝚖𝚙𝚝𝚜, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

  try {
    const enctxt = encodeURI(txt);
    const url = `https://codemage-api.hazeyy0.repl.co/api/mistral/prompt?prompt=${enctxt}&model=${txt2}`;
    const responses = await Promise.all(
      Array.from({ length: 4 }, async (_, index) => {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        return response.data;
      })
    );

    const paths = [];

    responses.forEach((data, index) => {
      const path = __dirname + `/cache/image${index + 1}.png`;
      fs.writeFileSync(path, Buffer.from(data, "binary"));
      paths.push(path);
    });

    const senderName = "🐾 𝐌𝐢𝐬𝐭𝐫𝐚𝐥 ( 𝐀𝐈 )";
    const message = `${senderName}\n\n𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝙸𝚖𝚊𝚐𝚎𝚜 𝚙𝚛𝚘𝚖𝚙𝚝`;

    const combinedMessage = {
      body: message,
      attachment: paths.map((path) => fs.createReadStream(path)),
    };

    api.sendMessage(combinedMessage, event.threadID, () => paths.forEach(fs.unlinkSync));
  } catch (e) {
    api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚒𝚗 𝚒𝚖𝚊𝚐𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚘𝚗", event.threadID, event.messageID);
  }
}

async function convertVoiceToText(audioUrl, api, event) {
  try {
    api.sendMessage("🕤 | 𝙼𝚒𝚜𝚝𝚛𝚊𝚕 𝙰𝙸 𝙲𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚊𝚞𝚍𝚒𝚘 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝 𝚏𝚘𝚛 𝚊 𝚖𝚘𝚖𝚎𝚗𝚝...", event.threadID);

    const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/api/try/voice2text?url=${encodeURIComponent(audioUrl)}`);
    const text = response.data.transcription;

    if (text) {
      const formattedText = formatFont(text);
      api.sendMessage(`🐾 𝐌𝐢𝐬𝐭𝐫𝐚𝐥 ( 𝐀𝐈 ) 𝙲𝚘𝚗𝚃𝚎𝚡𝚝\n\n ${formattedText}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🔴 𝚄𝚗𝚊𝚋𝚕𝚎 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚊𝚞𝚍𝚒𝚘.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚊𝚞𝚍𝚒𝚘:", error);
    api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚊𝚞𝚍𝚒𝚘.", event.threadID, event.messageID);
  }
}

module.exports.config = {
  name: "Mistral",
  version: "2.7",
  role: 0,
  credits: "Hazeyy",
  aliases: ["mistral", "Mistral"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  
  const lowerCaseBody = event.body.toLowerCase();

  if (
    event.type === "message_reply" &&
    lowerCaseBody.trim() === "mistral" &&
    event.messageReply.attachments[0] &&
    event.messageReply.attachments[0].type === "audio"
  ) {
    const audioAttachment = event.messageReply.attachments[0];
    const audioUrl = audioAttachment.url;
    convertVoiceToText(audioUrl, api, event);
    return;
  }

  const mistralName = "mistral";
  if (lowerCaseBody.startsWith(mistralName)) {
    handleMistralCommand(api, event);
  } else if (lowerCaseBody.startsWith("mistgif")) {
    handleFlameGifCommand(api, event);
  } else if (lowerCaseBody.startsWith("mistmage")) {
    handleMistralImageCommand(api, event);
  }
}
