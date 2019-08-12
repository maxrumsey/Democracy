const moment = require('moment');

module.exports = async (client) => {
  const votes = await global.Database.query(`SELECT * FROM \`votes\` WHERE status = 0`);
  for (var i = 0; i < votes.length; i++) {
    try {
      const server_id = votes[i].server_id;
      let config = await global.Database.query(`SELECT * FROM \`servers\` WHERE server_id = ?`, [server_id]);
      config = config[0];
      const date = moment(votes[i].created).add(config.vote_time.split(' ')[0], config.vote_time.split(' ')[1]);
      const now = moment();
      if (date.isBefore(now)) {
        const message = await client.channels.get(config.channel_vote_id).fetchMessage(votes[i].message_id);
        if (message.reactions.get('✅') == undefined ||
            message.reactions.get('❌') == undefined) continue;
        const counts = {
          yes: message.reactions.get('✅').count - 1,
          no: message.reactions.get('❌').count - 1
        }
        let result = false;
        let status = 3;
        const ratio = counts.yes / counts.no;

        if (counts.yes == 0) result = false;
        else if (counts.no == 0) result = true;
        else if (ratio >= config.vote_margin) result = true;

        if (result) {
          message.channel.send(global.Database.action(`Rule '${votes[i].contents || 'Removal of Rule: ' + votes[i].reference_vote_id}' has been approved.`, votes[i]))
          const rulechannel = client.channels.get(config.channel_rules_id);
          if (!rulechannel) return console.log('Rule channel could not be found.')
          let newmessage;
          switch (votes[i].type) {
            case "create":
              newmessage = await rulechannel.send(global.Database.formatRule(votes[i]))
              await global.Database.query('UPDATE `votes` SET message_id = ? WHERE (vote_id = ?)', [newmessage.id, votes[i].vote_id])
              status = 2;
              break;
            case "amend":
              let newRule = JSON.parse(JSON.stringify(votes[i]));
              newRule.vote_id = votes[i].reference_vote_id;
              console.log(newRule)
              newmessage = await rulechannel.send(global.Database.formatRule(newRule))
              const origRuleID = await global.Database.idtomessage(votes[i].reference_vote_id);
              const oldMessage = await rulechannel.fetchMessage(origRuleID);
              oldMessage.delete();
              status = 3;
              await global.Database.query('UPDATE `votes` SET contents = ?, message_id = ? WHERE (vote_id = ?)', [votes[i].contents, newmessage.id, votes[i].reference_vote_id])
              break;
            case "remove":
              (await rulechannel.fetchMessage(await global.Database.idtomessage(votes[i].reference_vote_id))).delete()
              status = 3;
              await global.Database.query('DELETE FROM `votes` WHERE (vote_id = ?)', [votes[i].reference_vote_id])
              break;
            default:
              return console.error(votes[i].type)
          }
        } else {
          status = 1;
          message.channel.send(global.Database.action(`Rule '${votes[i].contents || 'Removal of Rule: ' + votes[i].reference_vote_id}' has not been approved.`, votes[i]))
        }
        await global.Database.query('UPDATE `votes` SET status = ? WHERE (vote_id = ?)', [status, votes[i].vote_id])
      }
    } catch (e) {
      console.log(e)
    }
  }
  //module.exports(client);
}
