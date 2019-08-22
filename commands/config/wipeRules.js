module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  // Getting all active rules
  let rules = await global.Database.query(`SELECT * FROM \`votes\` WHERE (status = 2 AND server_id = ?)`,
    [msg.guild.id])

  // Looping through and deleting message from DB.
  for (var i = 0; i < rules.length; i++) {
    try {
      const message = await msg.client.channels.get(config.channel_rules_id).fetchMessage(rules[i].message_id);
      await message.delete()
    } catch (e) {
      continue;
    }
  }

  // Deleting from DB.
  await global.Database.query('UPDATE `votes` SET status = 4 WHERE (server_id = ?)', [msg.guild.id])

  return msg.reply('Rules wiped from database and deleted.')
}
