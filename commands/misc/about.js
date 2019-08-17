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
      },
      {
        "name": "Support Server",
        "value": "https://discord.gg/Hg4vaKs"
      },
      {
        "name": "Server Count",
        "value": msg.client.guilds.size + ' democratic servers!'
      },
      {
        "name": "Bot Invite",
        "value": "[Click here to invite me to your server!](https://discordapp.com/api/oauth2/authorize?client_id=610299806123819018&permissions=76800&scope=bot)"
      }
    ]
  };
  msg.channel.send("", { embed });
}
