const axios = require('axios');

let fontEnabled = true;
let currentFontStyle = "default";

function formatFont(text, fontStyle = "default") {
  const fontStyles = {
    default: {
      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
      n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
      N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
    },
    sans: {
      a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺",
      n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
      A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠",
      N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
    },
    serif: {
      a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦",
      n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
      A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌",
      N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙"
    },
    outline: {
     a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞",
      n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
      A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄",
      N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ"
     },
     script: {
      a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳", k: "𝓴", l: "𝓵", m: "𝓶",
      n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃",
      A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙", K: "𝓚", L: "𝓛", M: "𝓜",
      N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩"
     }
  };

  const selectedFontStyle = fontStyles[fontStyle] || fontStyles.default;

  let formattedText = "";
  for (const char of text) {
    if (fontEnabled && char in selectedFontStyle) {
      formattedText += selectedFontStyle[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.config = {
  name: "Gemma",
  version: "4.4",
  role: 0,
  credits: "Hazeyy",
  aliases: ["gemma", "Gemma"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length === 0) {
    api.sendMessage({ body: "🤖 𝙷𝚎𝚕𝚕𝚘, 𝙸 𝚊𝚖 𝙶𝚘𝚘𝚐𝚕𝚎 𝙶𝚎𝚖𝚖𝚊\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?" }, event.threadID, event.messageID);
    return;
  }

  const message = args.join(" ");

  try {
    if (args[0] === "set" && args[1] === "font") {
      if (args.length === 2) {
        api.sendMessage({ body: "🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n» ⚠️ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚜𝚙𝚎𝚌𝚒𝚏𝚢 𝚊 𝚏𝚘𝚗𝚝 𝚜𝚝𝚢𝚕𝚎:\n\n> 𝚜𝚊𝚗𝚜\n> 𝚜𝚎𝚛𝚒𝚏\n> 𝚍𝚎𝚏𝚊𝚞𝚕𝚝\n> 𝚘𝚞𝚝𝚕𝚒𝚗𝚎\n> 𝚜𝚌𝚛𝚒𝚙𝚝" }, event.threadID, event.messageID);
        return;
      }

      if (args.length === 3) {
        const fontStyle = args[2].toLowerCase();
        if (fontStyle === "sans" || fontStyle === "serif" || fontStyle === "default" || fontStyle === "outline" || fontStyle === "script") {
          currentFontStyle = fontStyle;
          api.sendMessage({ body: `🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n» ✅ 𝙵𝚘𝚗𝚝 𝚜𝚝𝚢𝚕𝚎 𝚌𝚑𝚊𝚗𝚐𝚎 𝚝𝚘 '${fontStyle}' 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢` }, event.threadID, event.messageID);
        } else {
          api.sendMessage({ body: "🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n» ❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚏𝚘𝚗𝚝 𝚜𝚝𝚢𝚕𝚎 𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛:\n\n> 𝚜𝚊𝚗𝚜\n> 𝚒𝚝𝚊𝚕𝚒𝚌\n> 𝚍𝚎𝚏𝚊𝚞𝚕𝚝\n> 𝚘𝚞𝚝𝚕𝚒𝚗𝚎\n> 𝚜𝚌𝚛𝚒𝚙𝚝" }, event.threadID, event.messageID);
        }
        return;
      }
    }

    if (args[0] === "on") {
      fontEnabled = true;
      api.sendMessage({ body: "🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n» 🟢 𝙵𝚘𝚗𝚝 𝙵𝚘𝚛𝚖𝚊𝚝𝚝𝚒𝚗𝚐 𝚒𝚜 𝚗𝚘𝚠 𝙴𝚗𝚊𝚋𝚕𝚎𝚍 «" }, event.threadID, event.messageID);
      return;
    }

    if (args[0] === "off") {
      fontEnabled = false;
      api.sendMessage({ body: "🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n» 🔴 𝙵𝚘𝚗𝚝 𝙵𝚘𝚛𝚖𝚊𝚝𝚝𝚒𝚗𝚐 𝚒𝚜 𝚗𝚘𝚠 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 «" }, event.threadID, event.messageID);
      return;
    }

    api.sendMessage({ body: "🗨️ | 𝙶𝚎𝚖𝚖𝚊 𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝..." }, event.threadID, event.messageID);

    const response = await axios.get(`https://haze-ai-models-8d44a842ac90.herokuapp.com/gemma?content=${encodeURIComponent(message)}&key=CutieHazeyy`);

    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      const content = response.data.choices[0].message.content;
      const formattedContent = formatFont(content, currentFontStyle);
      api.sendMessage({ body: `🎓 𝐆𝐞𝐦𝐦𝐚 7𝐛𝐢𝐭 ( 𝐀𝐈 )\n\n🖋️ 𝐀𝐬𝐤: '${message}'\n\n${formattedContent}` }, event.threadID, event.messageID);
    } else {
      console.error('🚫 𝙴𝚛𝚛𝚘𝚛: 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙶𝚎𝚖𝚖𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚘𝚛𝚖𝚊𝚝');
      api.sendMessage({ body: '🚫 𝙴𝚛𝚛𝚘𝚛: 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙶𝚎𝚖𝚖𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚘𝚛𝚖𝚊𝚝' }, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error.message);
    api.sendMessage({ body: '🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚢𝚘𝚞𝚛 𝙶𝚘𝚘𝚐𝚕𝚎 𝙶𝚎𝚖𝚖𝚊 𝙰𝙿𝙸.' }, event.threadID, event.messageID);
  }
};
