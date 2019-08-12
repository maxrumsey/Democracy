const discord = require('discord.js');
module.exports = (msg, command, args) => {
  const embed = {
    "description": "Democracy is a bot.",
    "timestamp": new Date(),
    "footer": {
      "icon_url": msg.client.user.avatarURL,
      "text": "Brought to you by Democracy Bot"
    },
    "author": {
      "name": "Democracy",
      "url": "https://democracy.maxrumsey.xyz",
      "icon_url": msg.client.user.avatarURL
    },
    "fields": [
      {
        "name": "Owner",
        "value": "Darth Maul#2237"
      }
    ]
  };
  msg.channel.send("", { embed });
}
