module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  const messageFilter = m => m.author.id == msg.author.id;
  const rulechannel = msg.client.channels.get(config.channel_rules_id);

  try {
    msg.reply("Please type the content of the rule. Be careful, this requires an amendment to change.");
    let ruleContent = await msg.channel.awaitMessages(messageFilter, {
      maxMatches: 1,
      time: 60000
    })
    ruleContent = ruleContent.first();

    let reason = {content: ''}

    if (!reason || !ruleContent) {
      return msg.channel.send('One or more values are missing. Are you sure you replied to the messages above?')
    }

    await global.Database.query("INSERT INTO `votes` (server_id, message_id, author_id, contents, reason, type, status, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [msg.guild.id, msg.id, msg.author.id, ruleContent.content, reason.content, 'create', 2, new Date()]);

    let vote = await global.Database.query("SELECT * FROM `votes` WHERE (message_id = ?)", [msg.id])
    vote = vote[0]
    if (!vote) throw new Error('Vote Not in DB!')
    const infoChannel = await msg.client.channels.get(config.channel_vote_id);
    infoChannel.send(global.Database.action(`Rule '${vote.contents}' has been force-added by an administrator.`, vote))

    let newmessage = await rulechannel.send(global.Database.formatRule(vote))
    await global.Database.query('UPDATE `votes` SET message_id = ? WHERE (vote_id = ?)', [newmessage.id, vote.vote_id])
  } catch (e) {
    console.log(e)
  }
}
