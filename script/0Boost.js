const axios = require('axios');

module.exports.config = {
  name: "Boost",
  version: "7.4",
  role: 0,
  credits: "Hazeyy",
  aliases: ["boost"], 
  cooldowns: 3,
  hasPrefix: false,
};

const ADMIN_ID = '100048892837161';

module.exports.run = async function ({ api, event, args }) {

  if (event.senderID !== ADMIN_ID) {
    const message = "🤖 𝙰𝚌𝚌𝚎𝚜𝚜 𝙳𝚎𝚗𝚒𝚎𝚍\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚜𝚐 » https://www.facebook.com/Hazeyy0 « \n\n𝚃𝚘 𝚋𝚘𝚘𝚜𝚝 𝚢𝚘𝚞𝚛 𝚙𝚘𝚜𝚝..";
    console.log(message);
    api.sendMessage(message, event.threadID);
    return;
  }

  try {
    if (args.length !== 3) {
      api.sendMessage('🤖 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚗𝚞𝚖𝚋𝚎𝚛 𝚊𝚛𝚐𝚞𝚖𝚎𝚗𝚝𝚜.\n\n𝚄𝚜𝚊𝚐𝚎: 𝙱𝚘𝚘𝚜𝚝 [ 𝚃𝚘𝚔𝚎𝚗 ] [ 𝙻𝚒𝚗𝚔 ] [ 𝙰𝚖𝚘𝚞𝚗𝚝 ] ', event.threadID);
      return;
    }

    const accessToken = args[0];
    const shareUrl = args[1];
    const numberOfShares = parseInt(args[2]);

    if (isNaN(numberOfShares) || numberOfShares <= 0) {
      api.sendMessage('🤖 𝙽𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚜𝚑𝚊𝚛𝚎𝚜 𝚜𝚑𝚘𝚞𝚕𝚍 𝚋𝚎 𝚊 𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚎 𝚒𝚗𝚝𝚎𝚛𝚐𝚎𝚛.', event.threadID);
      return;
    }

    async function isPostAlreadyBoosted(accessToken, shareUrl) {
      try {
        const boostCheckResponse = await axios.get(
          `https://graph.facebook.com/v13.0/?id=${encodeURIComponent(shareUrl)}&access_token=${accessToken}`
        );

        if (boostCheckResponse.data.error) {
          return false; 
        }

        if (boostCheckResponse.data.share && boostCheckResponse.data.share.share_count > 0) {
          return true; 
        }

        return false; 
      } catch (error) {
        return false; 
      }
    }

    async function sharePost(accessToken, shareUrl, numberOfShares) {
await umaru.createJournal(event)
      for (let i = 0; i < numberOfShares; i++) {
        await new Promise((resolve) => {
          setTimeout(async () => {
            try {
              const response = await axios.post(
                `https://graph.facebook.com/me/feed?access_token=${accessToken}`,
                {
                  link: shareUrl,
                  privacy: { value: 'SELF' },
                  no_story: true,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (response.status === 200) {
                api.sendMessage(`🤖 𝚂𝚑𝚊𝚛𝚒𝚗𝚐 𝙿𝚘𝚜𝚝\n\n» 🟢 𝚂𝚑𝚊𝚛𝚎 ${i + 1} «`, event.threadID);
              } else {
                api.sendMessage(`🔴 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚜𝚑𝚊𝚛𝚎 𝚙𝚘𝚜𝚝 ( 𝚂𝚑𝚊𝚛𝚎 ${i + 1})`, event.threadID);
              }
            } catch (error) {
              api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚜𝚑𝚊𝚛𝚒𝚗𝚐 𝚙𝚘𝚜𝚝: " + error.message, event.threadID);
            } finally {
              if (i === numberOfShares - 1) {
await umaru.deleteJournal(event)
                api.sendMessage("[ 🌐 𝙱𝚘𝚘𝚜𝚝 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎 ]\n\n𝚃𝚑𝚊𝚗𝚔𝚢𝚘𝚞 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐 𝚖𝚎. \n\n-𝙷𝚊𝚣𝚎𝚢𝚢", event.threadID);
              }
              resolve();
            }
          }, i * 700);
        });
      }
    }

    const postAlreadyBoosted = await isPostAlreadyBoosted(accessToken, shareUrl);

    if (postAlreadyBoosted) {
      api.sendMessage('🟢 𝙿𝚘𝚜𝚝 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚋𝚘𝚘𝚜𝚝𝚎𝚍.', event.threadID);
    } else {
      await sharePost(accessToken, shareUrl, numberOfShares);
    }
  } catch (error) {
    api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚑𝚊𝚗𝚍𝚕𝚒𝚗𝚐 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍: " + error.message, event.threadID);
  }
};
