module.exports = async (msg, command, args, config) => {
    if (config.vote_margin) {
      msg.channel.send("Vote Margin OK");
    } else {
      msg.channel.send("Vote Margin Not Found / Set");
    }
    if (config.vote_time) {
      msg.channel.send("Vote Time OK");
    } else {
      msg.channel.send("Vote Tome Not Found / Set");
    }
    if (config.admin_role) {
      msg.channel.send("Admin Role OK");
    } else {
      msg.channel.send("[WARNING] Admin Role Not Found / Set");
    }
    if (config.prefix) {
      msg.channel.send("Prefix OK");
    } else {
      msg.channel.send("Prefix Not Found / Set");
    }
    if (config.channel_vote_id) {
      msg.channel.send("Voting Channel OK");
    } else {
      msg.channel.send("Voting Channel Not Found / Set");
    }
    if (config.channel_rules_id) {
      msg.channel.send("Rules Channel OK");
    } else {
      msg.channel.send("Rules Channel Not Found / Set");
    }
    msg.channel.send('Debug Complete.')
}
