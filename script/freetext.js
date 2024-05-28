const axios = require("axios");

module.exports.config = {
    name: "freetext",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "shiki",
    description: "Send a free text message to a phone number",
    commandCategory: "Other",
    cooldowns: 5,
    dependencies: ["axios"]
};

module.exports.run = async function({ api, event, args }) {
    if (args.length < 2) {
        api.sendMessage("Usage: .freetext <phone_number> <message>", event.threadID, event.messageID);
        return;
    }

    const phoneNumber = args[0];
    const message = args.slice(1).join(' ');

    const url = 'https://lbcapigateway.lbcapps.com/lexaapi/lexav1/api/AddDefaultDisbursement';
    const headers = {
        'Content-Type': 'application/json',
        'token': 'O8VpRnC2bIwe74mKssl11c0a1kz27aDCvIci4HIA+GOZKffDQBDkj0Y4kPodJhyQaXBGCbFJcU1CQZFDSyXPIBni',
        'lbcOAkey': 'd1ca28c5933f41638f57cc81c0c24bca',
        'ptxToken': 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4NTgxMTgsImV4cCI6MTcxNjg1ODE3OCwiaXNzIjoiODQ3In0.nzRZCyss1EyGlSJ8y-PF0a55uZTC0h1D9Jh9Mb1e9DakyseSskQ9tKVYGzRgc-ZAwgxUtUhScVDYbdmgONUbgmXCoUkBg5NZ950tJGJ5Q06ogTuOFj_XiRm64gR_7OWghvv6Ex5onmjNPak9UgHSgRVUnwpQpStEfz2QX60jzwfG46N8EfXyprlE0p8DajRlPo6ZfynaiG5blON26iIJbMr8FxeJuPwZ2Q5WjD43vmuY_fuEBfDL9gY1vtHrnWBJECdn4FgrUKd6KB_m-KsI6cycGK6oetYU6hCcv5S11g2ULJoDWE8QLI-hTNfeZ0cGItnlK7lOuOtBFOfadZnEzEPIHOMk6bJjO2V33TQuB6U9mm29Pj9mIhmk418Hk6LXYDmoAKpDgUdCUS7nk7w6irIsi0mebeFTLHiqY3J-GJfzEC31t6VOMH23UsEv9qgb5v9Y-gR8vxAm2d-fIFyugsl8LE-dB3903gXzJ3P1xElRtG3yn8NGwoKc8jH_2i2-ifQtwFEr4jMpTkjn1YqiMmQSsEWaeF6YvT4fY5STnHtUPNH5fJ316mvuhyDegKr7cbG1Kg_EY5pswl7-oPlR4eqcVZv8ELzMuZc_s8ZQa9y5gcWzFyg_5FZfgn5leMIX9iQbc2UX6VkJ0HuYAPcVzQJdOZM9g1FM3NPho7EtsAs'
    };
    const payload = {
        Recipient: phoneNumber,
        Message: message,
        ShipperUuid: 'LBCEXPRESS',
        DefaultDisbursement: 3,
        ApiSecret: '03da764a333680d6ebd2f6f4ef1e2928',
        apikey: '7777be96b2d1c6d0dee73d566a820c5f'
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        if (response.status === 200) {
            api.sendMessage("Message sent successfully.", event.threadID, event.messageID);
        } else {
            api.sendMessage("Failed to send message. Please try again later.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error sending message:', error.message);
        api.sendMessage("Failed to send message. Please try again later.", event.threadID, event.messageID);
    }
};
