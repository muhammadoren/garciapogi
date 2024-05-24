module.exports.config = {
  name: "test",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Yan Maglinte",
  description: "Share a contact of a certain userID",
  usePrefix: true, 
  commandCategory: "message",
  cooldowns: 5 
};

module.exports.run = function ({ api, event }) {
  api.shareContact("", "100088334332155", event.threadID);
};
