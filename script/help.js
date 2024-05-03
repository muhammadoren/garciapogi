module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['help'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Hazeyy',
};

module.exports.run = async function({ api, event, enableCommands, args, Utils, prefix }) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      let helpMessage = `Command List:\n\n`;
      commands.forEach((c, i) => {
        helpMessage += `\t${i + 1}. ${prefix}${c}\n`;
      });
      helpMessage += `\nEvent List:\n\n`;
      eventCommands.forEach((e, i) => {
        helpMessage += `\t${i + 1}. ${prefix}${e}\n`;
      });
      helpMessage += `\nPage 1/1`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      api.sendMessage('Command not found.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.handleEvent = async function({ api, event, prefix }) {
  const { threadID, messageID, body } = event;
  const message = prefix ? 'This is my prefix: ' + prefix : "Sorry i don't have prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
