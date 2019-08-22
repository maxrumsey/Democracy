const discord = require('discord.js');
module.exports = async (msg, command, args) => {
  // Sending initial message with `await`
  const Date1 = new Date().getTime();
  const ping = await msg.channel.send('Pinging..')
  // Updating time
  const Date2 = new Date().getTime();
  ping.edit(`Pong! 🏓 Round Trip: ${Math.ceil(Date2-Date1)}ms`);
}
