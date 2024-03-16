const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "CodeLlama",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["code", "Codellama"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage("🖥️ 𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝙲𝚘𝚍𝚎𝙻𝚕𝚊𝚖𝚊 70𝚋 𝚏𝚛𝚘𝚖 𝙼𝚎𝚝𝚊.\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?", event.threadID, event.messageID);
    return;
  }

  try {
    const prompt = args.join(" ");
    const searchMessage = await api.sendMessage("🗨️ | 𝙲𝚘𝚍𝚎𝙻𝚕𝚊𝚖𝚊 𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

    const response = await axios.get(`https://haze-ai-models-8d44a842ac90.herokuapp.com/meta?prompt=${encodeURIComponent(prompt)}`);
    const output = formatFont(response.data.output.join("").trim());
    const currentTimePH = formatFont(moment().tz('Asia/Manila').format('hh:mm:ss A'));

    console.log("🟢 𝙲𝚘𝚍𝚎𝙻𝚕𝚊𝚖𝚊 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:", response.data);

    api.sendMessage(`🎓 𝐂𝐨𝐝𝐞𝐋𝐥𝐚𝐦𝐚 70𝐛 ( 𝐀𝐈 )\n\n🖋️ 𝐀𝐬𝐤: '${prompt}'\n\n${output}\n\n» ⏰ 𝚃𝚒𝚖𝚎: .⋅ ۵ ${currentTimePH} ۵ ⋅. «`, event.threadID, undefined, searchMessage.messageID);
  } catch (error) {
    console.error("🚫 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙲𝚘𝚍𝚎𝙻𝚕𝚊𝚖𝚊 𝙰𝙿𝙸:", error);

    api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚍𝚊𝚝𝚊 𝚏𝚛𝚘𝚖 𝙲𝚘𝚍𝚎𝙻𝚕𝚊𝚖𝚊 𝙰𝙿𝙸. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.", event.threadID);
  }
};

function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

