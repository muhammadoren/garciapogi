const WebSocket = require('ws');
const axios = require('axios');

module.exports.config = {
  name: "sms",
  version: "1.0",
  credits: "shiki",
  hasPrefix: false,
};

let websocket;

function getWebSocketURL() {
    return 'wss://free.blr2.piesocket.com/v3/1?api_key=w6poK6QZsvocLruCZu3uPko9VtK2GCzni4ob8UKp&notify_self=1';
}

module.exports.run = async function ({ api, event, args }) {
    try {
        if (args.length !== 2) {
            api.sendMessage('🤖 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚗𝚞𝚖𝚋𝚎𝚛 𝚊𝚛𝚐𝚞𝚖𝚎𝚗𝚝𝚜.\n\n𝚄𝚜𝚊𝚐𝚎: 𝚂𝙼𝚂 [ 𝙿𝚑𝚘𝚗𝚎𝙽𝚞𝚖𝚋𝚎𝚛 ] [ 𝙼𝚎𝚜𝚜𝚊𝚐𝚎 ] ', event.threadID);
            return;
        }

        const phoneNumber = args[0];
        const message = args[1];

        if (message.trim() === '') {
            api.sendMessage('🤖 𝙼𝚎𝚜𝚜𝚊𝚐𝚎 𝚌𝚊𝚗𝚗𝚘𝚝 𝚋𝚎 𝚋𝚕𝚊𝚗𝚔.', event.threadID);
            return;
        }

        if (!websocket || websocket.readyState !== WebSocket.OPEN) {
            websocket = new WebSocket(getWebSocketURL());
            websocket.onopen = function (evt) { onOpen(evt) };
            websocket.onclose = function (evt) { onClose(evt) };
            websocket.onerror = function (evt) { onError(evt) };
        }

        async function sendSMS(phoneNumber, message) {
            try {
                const data = {
                    "receiver": phoneNumber,
                    "message": message
                };
                const mydata = JSON.stringify(data);
                websocket.send(mydata);
                api.sendMessage('🟢 𝚂𝙼𝚂 𝚜𝚎𝚗𝚝', event.threadID);
            } catch (error) {
                api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚜𝙼𝚂 try again: " + error.message, event.threadID);
            }
        }

        sendSMS(phoneNumber, message);
    } catch (error) {
        api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚑𝚊𝚗𝚍𝚕𝚒𝚗𝚐 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍: " + error.message, event.threadID);
    }
};

function onOpen(evt) {
    console.log('CONNECTED');
}

function onClose(evt) {
    // Disconnected
}

function onError(evt) {
    console.error('ERROR: Webserver APP is not Open');
}
