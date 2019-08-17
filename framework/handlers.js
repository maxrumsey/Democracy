const { setIntervalAsync } = require('set-interval-async/dynamic')
exports.message = msg => {
  require('./index.js').commands.handle(msg);
}
exports.ready = () => {
  global.client.user.setPresence({ game: { name: 'with Democracy | d!help' }})
  console.log("Bot has started.")

  setIntervalAsync(
    async () => {await require('./index.js').checker(global.client)},
    1000
  )
}
exports.join = (guild) => {
  let defaultChannel = "";
  guild.channels.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  if (defaultChannel) {
    defaultChannel.send([
      'Hi, thanks for inviting me into your server! To start off, you\'d want to set a channel were rules and votes will be posted',
      'You can do that with the following commands:',
      '```d!setChannel vote #vote_for_rules_here\nd!setChannel rules #rules```',
      'The rule creation process is all automated, and easy to use.',
      'If you run into any problems, you can type d!help for a list of commands and d!debug to debug the bot if it is not working correctly.'
    ].join('\n'))
  }
}
