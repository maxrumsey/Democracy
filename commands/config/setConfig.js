module.exports = async (msg, command, args, config) => {
  const messageFilter = m => m.author.id == msg.author.id;

  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  msg.reply("What item of config do you want to change? <Vote Margin, Vote Time, Admin Role, Prefix>");
  let configItem = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })
  if (!configItem.first()) return msg.reply('Reply not found.');
  const arg = configItem.first().content.toLowerCase();
  if (arg.includes('margin')) {
    msg.reply('This should be a number. Eg:) 1.5 (1.5 yes votes for every 1 no vote.)')
  } else if (arg.includes('time')) {
    msg.reply('This should be a number and an unit of time. Eg:) 1 second.')
  } else if (arg.includes('role')) {
    msg.reply('This should be a role. Eg:) @Admins.')
  } else if (arg.includes('prefix')) {
    msg.reply('This should be a number of symbols. Eg:) d!.')
  } else {
    return msg.reply('Config item to change not found.')
  }

  msg.reply("What value do you want to change it to?");
  let value = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 30000
  })

  value = value.first();
  if (!value) return msg.reply('Reply not found.');

  if (arg.includes('margin')) {
    if (isNaN(parseFloat(value.content))) return msg.reply('Sorry, that value wasn\'t a number.')
    await global.Database.query('UPDATE `servers` SET vote_margin = ? WHERE (server_id = ?)', [parseFloat(value.content), msg.guild.id])
  } else if (arg.includes('time')) {
    await global.Database.query('UPDATE `servers` SET vote_time = ? WHERE (server_id = ?)', [value.content, msg.guild.id])
  } else if (arg.includes('role')) {
    if (!value.mentions.roles.first()) return msg.reply('Role mention not found.');
    let role_id = value.mentions.roles.first().id
    await global.Database.query('UPDATE `servers` SET admin_role = ? WHERE (server_id = ?)', [role_id, msg.guild.id])
  } else if (arg.includes('prefix')) {
    await global.Database.query('UPDATE `servers` SET prefix = ? WHERE (server_id = ?)', [value.content, msg.guild.id])
  } else {
    return msg.reply('Config item to change not found.')
  }

  return msg.reply('Updated.')
}