module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  let vote = await global.Database.query(`SELECT * FROM \`votes\` WHERE (status = 0 AND server_id = ? AND vote_id = ?)`,
    [msg.guild.id, args[1]])

  if (!vote[0]) return msg.reply('Sorry, the vote couldn\'t be found.');
  vote = vote[0];

  const message = await msg.client.channels.get(config.channel_vote_id).fetchMessage(vote.message_id);
  let status;

  if (args[0] == 'approve') {
    message.channel.send(global.Database.action(`Rule '${vote.contents || 'Removal of Rule: ' + vote.reference_vote_id}' has been veto-approved.`, vote))
    const rulechannel = msg.client.channels.get(config.channel_rules_id);
    if (!rulechannel) return console.log('Rule channel could not be found.')
    let newmessage;
    switch (vote.type) {
      case "create":
        newmessage = await rulechannel.send(global.Database.formatRule(vote))
        await global.Database.query('UPDATE `votes` SET message_id = ? WHERE (vote_id = ?)', [newmessage.id, vote.vote_id])
        status = 2;
        break;
      case "amend":
        let newRule = JSON.parse(JSON.stringify(vote));
        newRule.vote_id = vote.reference_vote_id;
        console.log(newRule)
        newmessage = await rulechannel.send(global.Database.formatRule(newRule))
        const origRuleID = await global.Database.idtomessage(vote.reference_vote_id);
        const oldMessage = await rulechannel.fetchMessage(origRuleID);
        oldMessage.delete();
        status = 3;
        await global.Database.query('UPDATE `votes` SET contents = ?, message_id = ? WHERE (vote_id = ?)', [vote.contents, newmessage.id, vote.reference_vote_id])
        break;
      case "remove":
        (await rulechannel.fetchMessage(await global.Database.idtomessage(vote.reference_vote_id))).delete()
        status = 3;
        await global.Database.query('DELETE FROM `votes` WHERE (vote_id = ?)', [vote.reference_vote_id])
        break;
      default:
        return console.error(vote.type)
    }
  } else if (args[0] == 'deny') {
    status = 1;
    message.channel.send(global.Database.action(`Rule '${vote.contents || 'Removal of Rule: ' + vote.reference_vote_id}' has been veto-denied.`, vote))
  } else {
    return msg.reply('Sorry, you can only **deny** or **approve** a vote.')
  }
  await global.Database.query('UPDATE `votes` SET status = ? WHERE (vote_id = ?)', [status, vote.vote_id])
}
