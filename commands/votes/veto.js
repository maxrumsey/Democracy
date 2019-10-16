module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  // Confirming vote exists
  let vote = await global.Database.query(`SELECT * FROM \`votes\` WHERE (status = 0 AND server_id = ? AND vote_id = ?)`,
    [msg.guild.id, args[1]])

  if (!vote[0]) return msg.fail('Not found', 'Sorry, the rule couldn\'t be found. Are you sure you entered the ID correctly?');
  vote = vote[0];

  // Getting vote message
  const message = await msg.client.channels.get(config.channel_vote_id).fetchMessage(vote.message_id);
  // Status of vote. See README.md
  let status;

  // Same code from ../framework/checker.js
  if (args[0] == 'approve') {
    // Adding to log channel
    message.channel.send(global.Database.action(`Rule '${vote.contents || 'Removal of Rule: ' + vote.reference_vote_id}' has been veto-approved.`, vote))
    const rulechannel = msg.client.channels.get(config.channel_rules_id);
    // Error checking
    if (!rulechannel) return console.log('Rule channel could not be found.')
    let newmessage;
    switch (vote.type) {
      case "create":
        newmessage = await rulechannel.send(global.Database.formatRule(vote))
        await global.Database.query('UPDATE `votes` SET message_id = ? WHERE (vote_id = ?)', [newmessage.id, vote.vote_id])
        status = 2;
        break;
      case "amend":
        // Deep copy of vote
        let newRule = JSON.parse(JSON.stringify(vote));
        // Deep copy required for this change:
        newRule.vote_id = vote.reference_vote_id;
        // Sending new rule
        newmessage = await rulechannel.send(global.Database.formatRule(newRule))
        // Deleting old message
        const origRuleID = await global.Database.idtomessage(vote.reference_vote_id);
        const oldMessage = await rulechannel.fetchMessage(origRuleID);
        oldMessage.delete();
        status = 3;
        // Updating DB
        await global.Database.query('UPDATE `votes` SET contents = ?, message_id = ? WHERE (vote_id = ?)', [vote.contents, newmessage.id, vote.reference_vote_id])
        break;
      case "remove":
        // Updating DB
        (await rulechannel.fetchMessage(await global.Database.idtomessage(vote.reference_vote_id))).delete()
        status = 3;
        // Updating DB
        await global.Database.query('DELETE FROM `votes` WHERE (vote_id = ?)', [vote.reference_vote_id])
        break;
      default:
        return console.error(vote.type)
    }
  } else if (args[0] == 'deny') {
    status = 1;
    message.channel.send(global.Database.action(`Rule '${vote.contents || 'Removal of Rule: ' + vote.reference_vote_id}' has been veto-denied.`, vote))
  } else {
    return msg.fail('Incorrect Value', 'Sorry, you can only **deny** or **approve** a vote.')
  }
  // Updating DB
  await global.Database.query('UPDATE `votes` SET status = ? WHERE (vote_id = ?)', [status, vote.vote_id])
}
