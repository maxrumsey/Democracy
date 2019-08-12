module.exports = async (msg, command, args) => {
  const votes = await global.Database.query(`SELECT * FROM \`votes\` WHERE (status = 2 AND server_id = ?)`, [msg.guild.id]);

  for (var i = 0; i < votes.length; i++) {
    msg.channel.send(global.Database.formatRule(votes[i]));
  }
}
