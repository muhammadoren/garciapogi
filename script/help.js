module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'shiki',
  commandsPerPage: 10 // Maximum number of commands to display per page
};

module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    const commandsPerPage = module.exports.config.commandsPerPage;
    
    if (!input) {
      let page = 1;
      const totalPages = Math.ceil(commands.length / commandsPerPage);
      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, commands.length);
      let helpMessage = `Commands List (Page ${page}/${totalPages}):\n\n`;
      
      for (let i = start; i < end; i++) {
        helpMessage += `\t${i + 1} ${prefix}${commands[i]}\n`;
      }
      
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const totalPages = Math.ceil(commands.length / commandsPerPage);
      
      if (page < 1 || page > totalPages) {
        api.sendMessage('Invalid page number.', event.threadID, event.messageID);
        return;
      }
      
      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, commands.length);
      let helpMessage = `Commands List (Page ${page}/${totalPages}):\n\n`;
      
      for (let i = start; i < end; i++) {
        helpMessage += `\t${i + 1} ${prefix}${commands[i]}\n`;
      }
      
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      // Logic for displaying specific command information
    }
  } catch (error) {
    console.log(error);
  }
};
