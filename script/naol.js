const fs = require("fs");

module.exports.config = {
  name: "naol",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["naol", "sanaol"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("naol")==0 || event.body.indexOf("Naol")==0 || event.body.indexOf("sanaol")==0 || event.body.indexOf("Sanaol")==0 || event.body.indexOf("san aol")==0 || event.body.indexOf("Sana ol")==0 || event.body.indexOf("sana all")==0 || event.body.indexOf("Sana all")==0 || event.body.indexOf("sanaall")==0 || event.body.indexOf("Sanaall")==0 || event.body.indexOf("sabaok")==0 || event.body.indexOf("Sabaok")==0) {
    var msg = {
        body: "(2)",
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
