module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.fail('No Permission', 'Sorry, you do not have the administrator role or the Manage Server permission.')
  let disabled;

  if (config.disabled === 0) disabled = 1;
  else disabled = 0;

  await global.Database.query('UPDATE `servers` SET disabed = ? WHERE (server_id = ?)', [disabled, msg.guild.id])

  return msg.success('The bot has been ' + ((disabled === 0) ? 'disabled' : 're-enabled') + 're-enabled.')
