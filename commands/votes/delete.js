module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  let vote = await global.Database.query(`SELECT * FROM \`votes\` WHERE (status = 2 AND server_id = ? AND vote_id = ?)`,
    [msg.guild.id, args[0]])

  if (!vote[0]) return msg.reply('Sorry, the rule couldn\'t be found.');
  vote = vote[0];

  const message = await msg.client.channels.get(config.channel_rules_id).fetchMessage(vote.message_id);
  await message.delete()

  msg.client.channels.get(config.channel_vote_id).send(global.Database.action(`Rule '${vote.contents}' has been deleted by ${msg.author}.`, vote))
  await global.Database.query('UPDATE `votes` SET status = 4 WHERE vote_id = ?', [vote.vote_id])
  msg.reply('Rule deleted.')
}
