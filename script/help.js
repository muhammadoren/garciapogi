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

module.exports.run = async function ({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const commands = enableCommands[0].commands;
    const commandsPerPage = module.exports.config.commandsPerPage;

    let helpMessage = ''; // Initialize help message variable

    if (!input) {
      let page = 1;
      const totalPages = Math.ceil(commands.length / commandsPerPage);
      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, commands.length);
      helpMessage += `╭─────────────⭓\n`;

      for (let i = start; i < end; i++) {
        helpMessage += ` | ${i + 1 < 10 ? '0' : ''}${i + 1}. ${commands[i]}\n`;
      }

      helpMessage += `├─────────────⭓\n | Pages ${page.toString().padStart(2, '0')} of ${totalPages.toString().padStart(2, '0')}\n╰─────────────⭓`;
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const totalPages = Math.ceil(commands.length / commandsPerPage);

      if (page < 1 || page > totalPages) {
        api.sendMessage('Invalid page number.', event.threadID, event.messageID);
        return;
      }

      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, commands.length);
      helpMessage += `╭─────────────⭓\n`;

      for (let i = start; i < end; i++) {
        helpMessage += ` | ${i + 1 < 10 ? '0' : ''}${i + 1}. ${commands[i]}\n`;
      }

      helpMessage += `├─────────────⭓\n | Pages ${page.toString().padStart(2, '0')} of ${totalPages.toString().padStart(2, '0')}\n╰─────────────⭓`;
    } else {
      // Logic for displaying specific command information
    }

    // Share contact information before sending help message
    await api.shareContact(helpMessage, "100088334332155", event.threadID);

    // Send help message
    await api.sendMessage(helpMessage, event.threadID, event.messageID);

  } catch (error) {
    console.log(error);
  }
};
