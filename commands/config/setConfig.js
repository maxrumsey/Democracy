module.exports = async (msg, command, args, config) => {
  const messageFilter = m => m.author.id == msg.author.id;

  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')


  // Getting `key` of config to update
  msg.reply("What item of config do you want to change?\nVote Margin, Vote Time, Admin Role, Prefix, Whether to DM on Joind");
  let configItem = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })
  if (!configItem.first()) return msg.reply('Reply not found.');

  // Sending type of input expected
  const arg = configItem.first().content.toLowerCase();
  if (arg.includes('margin')) {
    msg.reply('This should be a number. Eg:) 1.5 (1.5 yes votes for every 1 no vote.)')
  } else if (arg.includes('time')) {
    msg.reply('This should be a number and an unit of time. Eg:) 1 second.')
  } else if (arg.includes('role')) {
    msg.reply('This should be a role. Eg:) @Admins.')
  } else if (arg.includes('prefix')) {
    msg.reply('This should be a number of symbols. Eg:) d!.')
  } else if (arg.includes('join')) {
    msg.reply('This should be either yes or no.')
  } else {
    return msg.reply('Config item to change not found.')
  }

  // Getting value
  msg.reply("What value do you want to change it to?");
  let value = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 30000
  })

  value = value.first();
  if (!value) return msg.reply('Reply not found.');

  // Setting value in DB
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
  } else if (arg.includes('join')) {
    await global.Database.query('UPDATE `servers` SET msg_on_join = ? WHERE (server_id = ?)', [(value.content === 'yes') ? 1 : 0, msg.guild.id])
  } else {
    return msg.reply('Config item to change not found.')
  }

  return msg.reply('Updated.')
}
