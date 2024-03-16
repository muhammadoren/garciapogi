const axios = require("axios");

module.exports.config = {
  name: "DuckGo",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["duckgo", "duck"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  const question = args.join(" ");

  if (!question) {
    api.sendMessage("🎓 𝙷𝚎𝚕𝚕𝚘 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚚𝚞𝚎𝚛𝚢 𝚝𝚘 𝚜𝚎𝚊𝚛𝚌𝚑 𝚘𝚗 𝙳𝚞𝚌𝚔𝚐𝚘.", event.threadID, event.messageID);
    return;
  }

  try {
    api.sendMessage("🕟 | 𝙳𝚞𝚌𝚔𝙶𝚘 𝚒𝚜 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛 𝚊𝚗𝚜𝚠𝚎𝚛...", event.threadID, event.messageID);

    const response = await axios.get(`https://hazeyy-merge-apis-b924b22feb7b.herokuapp.com/duckgo/api?question=${encodeURIComponent(question)}`);
    const answer = response.data.answer;

    if (answer) {
      const formattedAnswer = formatFont(answer);
      api.sendMessage(`🎓 𝐃𝐮𝐜𝐤𝐆𝐨\n\n🖋️ 𝐀𝐬𝐤: '${question}'\n\n${formattedAnswer}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🤖 𝙳𝚞𝚌𝚔𝙶𝚘 𝚌𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚏𝚒𝚗𝚍 𝚊𝚗𝚜𝚠𝚎𝚛.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🤖 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚎𝚜𝚒𝚗𝚐 𝙳𝚞𝚌𝚔𝙶𝚘 𝚛𝚎𝚚𝚞𝚎𝚜𝚝:", error);
    api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚢𝚘𝚞𝚛 𝙳𝚞𝚌𝚔𝙶𝚘 𝙰𝙿𝙸 𝚊𝚖𝚍 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.", event.threadID, event.messageID);
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
    if (char === ' ') {
      formattedText += ' '; 
    } else if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}
