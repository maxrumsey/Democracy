module.exports = async (msg, command, args, config) => {
  const embed = {
    description: "Config",
    fields: [{
      name: "Votes Channel",
      value: config.channel_vote_id ? `<#${config.channel_vote_id}>` : "Not Found"
    },
    {
      name: "Rules Channel",
      value: config.channel_rules_id ? `<#${config.channel_rules_id}>` : "Not Found"
    },
    {
      name: "Admin Role",
      value: config.admin_role ? `<@&${config.admin_role}>` : "Not Found"
    },
    {
      name: "Prefix",
      value: config.prefix
    },
    {
      name: "Vote Time",
      value: config.vote_time
    },
    {
      name: "Vote Margin",
      value: config.vote_margin
    },
    {
      name: "Whether to DM new members the rules",
      value: config.msg_on_join ? 'Yes' : 'No'
    },
    {
      name: "Internal Server ID",
      value: config.id
    }],
    timestamp: new Date(),
    footer: {
      icon_url: msg.client.user.avatarURL,
      text: "Brought to you by Democracy Bot"
    },
    author: {
      name: "Democracy",
      url: "https://democracy.maxrumsey.xyz",
      icon_url: msg.client.user.avatarURL
    }
  }
  msg.channel.send({embed})
}
