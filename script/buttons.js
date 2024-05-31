module.exports.config = {
  name: "buttons",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Yan Maglinte",
  description: "Share a contact of a certain userID",
  usePrefix: true, 
  commandCategory: "message",
  cooldowns: 5 
};

module.exports.run = function ({ api, event }) {
  const buttons = [
    {
      type: "postback",
      title: "/HELP",
      payload: "HELP_PAYLOAD"
    },
    {
      type: "postback",
      title: "/COMMANDS",
      payload: "COMMANDS_PAYLOAD"
    }
  ];

  const messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Hello this is your contact!",
        buttons: buttons
      }
    }
  };

  api.sendMessage(messageData, event.threadID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      api.shareContact("Contact shared!", event.senderID, event.threadID, (err, data) => {
        if (err) console.log(err);
      });
    }
  });
};
