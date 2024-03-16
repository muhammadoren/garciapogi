const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
  name: "Wattpad",
  version: "1.8",
  role: 0,
  credits: "Hazeyy",
  aliases: ["wattpadd"], 
  cooldowns: 3,
  hasPrefix: false,
};

function formatFont(text) {
  const fontMapping = {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹"
  }

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

module.exports.run = async function ({ api, event, args }) {
    const query = args.join(" ");
    axios.get(`https://www.wattpad.com/search/${query}`)
        .then(async ({ data }) => {
            const $ = cheerio.load(data);
            const resp = [];

            $('div.story-card-data.hidden-xxs > div.story-info').each(function (a, b) {
                const result = {
                    status: 200,
                    author: '@Hazeyy',
                    title: $(b).find('> div.title').text(),
                    view: $(b).find('> ul > li:nth-child(1) > div.icon-container > div > span.stats-value').text(),
                    vote: $(b).find('> ul > li:nth-child(2) > div.icon-container > div > span.stats-value').text(),
                    chapter: $(b).find('> ul > li:nth-child(3) > div.icon-container > div > span.stats-value').text(),
                    url: 'https://www.wattpad.com' + $(b).find('a').attr('href'),
                    description: $(b).find('> div.description').text().replace(/\n/g, ''),
                };
                resp.push(result);
            });

   api.sendMessage('🔍𝘚𝘦𝘢𝘳𝘤𝘩𝘪𝘯𝘨 𝘧𝘰𝘳 𝘴𝘵𝘰𝘳𝘪𝘦𝘴...', event.threadID);

            // Get the top 2 search results
            const topResults = resp.slice(0, 2);

            // Fetch and format the related book cover images
            const imageRequests = topResults.map(async (result) => {
                try {
                    const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(result.title)}&tbm=isch`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                        },
                    });
                    const $ = cheerio.load(response.data);
                    const imageUrl = $('img').eq(1).attr('src');
                    return imageUrl;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            // Send the message to the chat when all image requests are complete
            Promise.all(imageRequests)
                .then((imageUrls) => {
                    // Format the top 2 search results as a message
                    let message = '';
                    for (let i = 0; i < topResults.length; i++) {
                        const result = topResults[i];
                        const imageUrl = imageUrls[i];

                        message += `[${i + 1}] Title: ${formatFont(result.title)}\nAuthor: ${formatFont(result.author)}\nViews: ${formatFont(result.view)}\nVotes: ${formatFont(result.vote)}\nChapters: ${formatFont(result.chapter)}\nDescription: ${formatFont(result.description)}\nURL: ${result.url}\n\n`;
                        if (imageUrl) {
                            message += `!( Book Cover ${i + 1} )(${imageUrl})\n\n`;
                        } else {
                            message += `😿𝖲𝗈𝗋𝗋𝗒, 𝖭𝗈 𝗂𝗆𝖺𝗀𝖾 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗈𝗄..\n\n`;
                        }
                    }

                    // Send the message to the chat
                    api.sendMessage(message, event.threadID, event.messageID);
                })
                .catch((error) => {
                    console.error(error);
                    api.sendMessage("😿𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋, 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖻𝗈𝗈𝗄 𝖼𝗈𝗏𝖾𝗋 𝗂𝗆𝖺𝗀𝖾𝗌..", event.threadID, event.messageID);
                });
        })
        .catch((error) => {
            console.error(error);
            api.sendMessage("😿𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋, 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍..", event.threadID, event.messageID);
        });
};
