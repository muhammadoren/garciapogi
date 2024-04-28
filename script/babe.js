const axios = require('axios');

module.exports.config = {  
  name: "babe",  
  version: "1.0.0",  
  credits: "LiANE",  
  hasPermission: 0,  
  commandCategory: "utility",  
  usage: "[ prefix ]babe [prompt]",  
  usePrefix: true,  
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {  
  try {      
    const query = args.join(" ");      
    if (query) {        
      const prompt = `({ "prompt": "${query}", "language": "Filipino/taglish", "role": "casual lover, close person", "yourGender": "female", "context": "I'm a girl, what should I reply to that prompt. Your replies should be in a JSON format that simulates a natural conversation with more like a human to human conversation with some flirt but (your response must not be cheesy or corny). And should be as short as possible", "example": { "response": "string" } })`;
      const processingMessage = await api.sendMessage(`replying...`, event.threadID);
      const response = await axios.get(`https://lianeapi.onrender.com/@nealianacagara/api/gd_move_copilot?query=${encodeURIComponent(prompt)}`);

      if (response.data && response.data.message) {          
        const gdResponse = response.data.message.trim().replace(/🛠️ 𝗚𝗗 𝗖𝗼𝗽𝗶𝗹𝗼𝘁|{}|"/g, ''); // Remove labels and quotation marks
        await api.sendMessage({ body: gdResponse }, event.threadID, event.messageID);          
        console.log(`Sent GD Copilot: Move's response to the user`);        
      } else {          
        throw new Error(`Invalid or missing response from  API`);        
      }        
      await api.unsendMessage(processingMessage.messageID);      
    }    
  } catch (error) {      
    console.error(`❌ | Failed to get GD Copilot: Move's response: ${error.message}`);      
    api.sendMessage(`❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);    
  }  
};
