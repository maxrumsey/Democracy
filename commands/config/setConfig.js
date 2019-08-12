const messageFilter = m => m.author.id == msg.author.id;

module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  msg.reply("What item of config do you want to change? <Vote Margin, Vote Time, Admin Role, Prefix>");
  let configItem = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })

  const arg = configItem.first().content;

  msg.reply("What value do you want to change it to?");
  let value = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })

  if (arg.includes('margin')) {

  } else if (arg.includes('time')) {
    const number =
  } else if (arg.includes('role')) {

  } else if (arg.includes('prefix')) {

  } else {
    return msg.reply('Config item to change not found.')
  }

  return msg.reply('Updated.')
}
