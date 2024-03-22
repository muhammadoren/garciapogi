const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "Blackbox",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["box", "Box"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 𝚝𝚛𝚊𝚒𝚗𝚎𝚍 𝚋𝚢 𝙶𝚘𝚘𝚐𝚕𝚎.\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?", event.threadID, event.messageID, event.messageID);
    return;
  }

  api.sendMessage("🗨️ | 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐....", event.threadID, event.messageID);

  try {
    const query = args.join(" ");
    const response = await axios.get(`https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/blackbox/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer);
      const currentTimePH = formatFont(moment().tz('Asia/Manila').format('hh:mm:ss A'));

      api.sendMessage(`🎓 𝐁𝐥𝐚𝐜𝐤𝐁𝐨𝐱 ( 𝐀𝐈 )\n\n🖋️ 𝐀𝐬𝐤: '${query}'\n\n${formattedAnswer}\n\n» ⏰ 𝚃𝚒𝚖𝚎: .⋅ ۵ ${currentTimePH} ۵ ⋅. «`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚗𝚘 𝚛𝚎𝚕𝚎𝚟𝚊𝚗𝚝 𝚊𝚗𝚜𝚠𝚎𝚛 𝚏𝚘𝚞𝚗𝚍..", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚘𝚗 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙿𝙸...", event.threadID, event.messageID);
    return;
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
