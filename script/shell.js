module.exports.config = {
 name: "shell",
 version: "7.3.1",
 role: 0,
 aliases: ["term"],
 credits: "cliff",
cooldown: 0,
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
 if (!god.includes(event.senderID)) 
return api.sendMessage("LOL hindi ka admin", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
  if (error) {
    api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
    return;
  }
  if (stderr) {
    api.sendMessage(`stderr:\n ${stderr}`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`stdout:\n ${stdout}`, event.threadID, event.messageID);
});
}