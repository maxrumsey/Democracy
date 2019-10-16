const discord = require('discord.js');
module.exports = (msg, command, args, config) => {
  const embed = {
    description: "Democracy is a bot powering democratic Discord servers. It's free to use, and has first class features.",
    timestamp: new Date(),
    color: 16777215,
    footer: {
      icon_url: msg.client.user.avatarURL,
      text: "Brought to you by Democracy Bot"
    },
    author: {
      name: "Democracy",
      url: "https://democracy.maxrumsey.xyz",
      icon_url: msg.client.user.avatarURL
    },
    fields: [
      {
        name: "Owner",
        value: "ExiFlame#3685"
      },
      {
        name: "Help Command",
        value: config.prefix + "help"
      },
      {
        name: "Support Server",
        value: "https://discord.gg/Hg4vaKs"
      },
      {
        name: "Server Count",
        value: msg.client.guilds.size + ' democratic servers!'
      },
      {
        name: "Bot Invite",
        value: "[Click here to invite me to your server!](https://discordapp.com/api/oauth2/authorize?client_id=610299806123819018&permissions=76800&scope=bot)"
      }
    ]
  };
  msg.channel.send("", { embed });
}
