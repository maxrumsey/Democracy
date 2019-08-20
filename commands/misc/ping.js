const discord = require('discord.js');
module.exports = async (msg, command, args) => {
  const Date1 = new Date().getTime();
  const ping = await msg.channel.send('Pinging..')
  const Date2 = new Date().getTime();
  ping.edit(`Pong! 🏓 Round Trip: ${Math.ceil(Date2-Date1)}ms`);
}
