const axios = require('axios');

module.exports.config = {
  name: 'guard',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "Turn guard on/off using a provided token",
  usage: "guard [on/off] [token]",
  credits: 'shiki',
  cooldown: 5,
};

class ProfileGuard {
  constructor(token) {
    this.token = token;
    this.session = axios.create({ baseURL: 'https://graph.facebook.com/' });
  }

  async getId() {
    const response = await this.session.get(`me?fields=name,id&access_token=${this.token}`);
    return response.data.id;
  }

  async updateGuardStatus(stat) {
    try {
      const id = await this.getId();
      const varData = {
        '0': {
          'is_shielded': stat,
          'session_id': '9b78191c-84fd-4ab6-b0aa-19b39f04a6bc',
          'actor_id': String(id),
          'client_mutation_id': 'b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0'
        }
      };
      const data = {
        'variables': JSON.stringify(varData),
        'method': 'post',
        'doc_id': '1477043292367183',
        'query_name': 'IsShieldedSetMutation',
        'strip_defaults': 'true',
        'strip_nulls': 'true',
        'locale': 'en_US',
        'client_country_code': 'US',
        'fb_api_req_friendly_name': 'IsShieldedSetMutation',
        'fb_api_caller_class': 'IsShieldedSetMutation'
      };
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `OAuth ${this.token}`
      };
      const response = await this.session.post('graphql', new URLSearchParams(data), { headers });

      // Check for correct response data structure
      if (response.data && response.data.data && response.data.data['0'] && typeof response.data.data['0'].is_shielded !== 'undefined') {
        const isShielded = response.data.data['0'].is_shielded;
        if (isShielded === stat) {
          return `Successfully ${stat ? 'activated' : 'deactivated'} Profile Guard.`;
        } else {
          return `Failed to ${stat ? 'activate' : 'deactivate'} Profile Guard.`;
        }
      } else {
        return "Request successful check profile🛸";
      }
    } catch (error) {
      throw new Error('Profile Guard is off ✅ ' + error.message);
    }
  }
}

module.exports.run = async function({ api, event, args }) {
  const command = args[0];
  const token = args[1];

  if (!command || !token) {
    return api.sendMessage("❌Please provide a command ('on' or 'off') and a token.", event.threadID, event.messageID);
  }

  if (command !== 'on' && command !== 'off') {
    return api.sendMessage("❌ Invalid command. Use 'on' or 'off'.", event.threadID, event.messageID);
  }

  try {
    const guard = new ProfileGuard(token);
    const result = await guard.updateGuardStatus(command === 'on');
    api.sendMessage(result, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error:', error.message);
    api.sendMessage('An error occurred while performing the guard operation.', event.threadID, event.messageID);
  }
};
