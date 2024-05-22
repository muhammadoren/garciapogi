const axios = require('axios');
const apiKey = "84ee8ffc30644f58a7878d83519ae4dc";

async function getIpInfo(ipAddress) {
  try {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
}

module.exports.config = {
  name: "ip",
  version: "1.0",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "Fetch information about an IP address",
  aliases: ["ip"],
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  const ipAddress = args[0];

  if (!ipAddress) {
    api.sendMessage('Usage: IPInfo [IP Address]', event.threadID, event.messageID);
    return;
  }

  try {
    const data = await getIpInfo(ipAddress);

    const formattedResult = `
🤖 Here's what I found for IP address ${ipAddress}:

🌐 IP ADDRESS: ${data.ip}
🌍 CONTINENT CODE: ${data.continent_code}
🌎 CONTINENT NAME: ${data.continent_name}
🌐 COUNTRY CODE2: ${data.country_code2}
🌐 COUNTRY CODE3: ${data.country_code3}
📌 COUNTRY NAME: ${data.country_name}
🏛️ COUNTRY CAPITAL: ${data.country_capital}
🏞️ STATE/PROVINCE: ${data.state_prov}
🌆 CITY: ${data.city}
📮 ZIPCODE: ${data.zipcode}
🌍 LATITUDE: ${data.latitude}
🌍 LONGITUDE: ${data.longitude}
🇪🇺 Is EU: ${data.is_eu ? 'Yes' : 'No'}
📞 CALLING CODE: ${data.calling_code}
🌐 COUNTRY TLD: ${data.country_tld}
🗣️ LANGUAGES: ${data.languages}
🏳️ COUNTRY FLAG: ${data.country_flag}
🌐 GEONAME ID: ${data.geoname_id}
🌐 ISP: ${data.isp}
🌐 CONNECTION TYPE: ${data.connection_type || 'N/A'}
🏢 ORGANIZATION: ${data.organization}
💰 CURRENCY CODE: ${data.currency.code}
💰 CURRENCY NAME: ${data.currency.name}
💰 CURRENCY SYMBOL: ${data.currency.symbol}
🌍 TIME ZONE: ${data.time_zone.name}
🕒 OFFSET: ${data.time_zone.offset}
⏰ CURRENT TIME: ${data.time_zone.current_time}
🕒 CURRENT TIME (Unix): ${data.time_zone.current_time_unix}
🌞 Is DST: ${data.time_zone.is_dst ? 'Yes' : 'No'}
🌞 DST SAVINGS: ${data.time_zone.dst_savings}

🏠 FULL ADDRESS: ${data.city}, ${data.state_prov}, ${data.country_name}, ${data.zipcode}
🌐 GOOGLE MAP\n[Open in Google Maps](https://www.google.com/maps?q=${data.latitude},${data.longitude})`;

    api.sendMessage(formattedResult, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching IP information.", event.threadID, event.messageID);
  }
};
