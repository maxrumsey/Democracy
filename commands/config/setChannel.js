module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  // Confirming channel exists and is in guild.
  const channel = msg.mentions.channels.first();
  if (!channel) return msg.fail('Channel not found', 'The channel specifed could not be found in this Discord server.');
  if (channel.guild.id != msg.guild.id) return msg.fail('Channel not found', 'The channel specifed could not be found in this Discord server.');

  // Determing type of channel (voting channel or rules channel) and updating DB.
  if (args[0] == 'vote') {
    await global.Database.query('UPDATE `servers` SET channel_vote_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])
  } else if (args[0] == 'rules') {
    await global.Database.query('UPDATE `servers` SET channel_rules_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])
  } else {
    return msg.fail('Incorrect Input', 'The type of channel can only be **vote** or **rules**.')
  }

  return msg.reply('Updated.')
}
