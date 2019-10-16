const extended = require('./extends.js')
exports.handle = async msg => {
  // Reccommended return options
  if (msg.author.bot) return;
  if (msg.channel.type !== 'text') return;

  // Getting prefix and determining if server config exists in DB
  let prefix = await global.Database.query("SELECT `prefix` FROM `servers` WHERE server_id = ?", msg.guild.id)
  if (!prefix[0]) {
    // Default config
    await global.Database.query("INSERT INTO `servers` (server_id, vote_margin, vote_time, prefix) VALUES (?, ?, ?, ?)",
      [msg.guild.id, 1, '1 d', 'd!'])
    prefix = 'd!'
  } else {
    prefix = prefix[0].prefix;
  }
  if (!msg.content.startsWith(prefix)) return;

  // Getting config for command
  let config = await global.Database.query("SELECT * FROM `servers` WHERE server_id = ?", msg.guild.id)

  // Formatting
  let command = msg.content.split(' ')[0].split('')
  for (var i = 0; i < prefix.length; i++) {
    command.shift();
  }
  command = command.join('');

  // Getting command and executing
  if (global.commands[command]) {
    let args = msg.content.split(' ');
    args.shift();
    extended(msg, config[0])
    try {
      await global.commands[command](msg, commands, args, config[0]);
    } catch (e) {
      try {
        // Error handling.
        await msg.author.channel.send('Oops, I failed to complete that command. Can you confirm I have permission to post in the vote, rule and current channel?')
        await msg.channel.send('Error: ' + e.message);
        console.error(e)
      } catch (f) {
        return;
      }
    }
  }
}
exports.help = msg => {

}
exports.init = () => {
  global.commands = {};
  global.configs = {};

  // Loading all commands from ../commands
  for (var i = 0; i < categories.length; i++) {
    const config = require('../commands/' + categories[i] + '/config.json');
    global.configs[categories[i]] = config;
    for (var j = 0; j < config.commands.length; j++) {
      global.commands[config.commands[j]] = require('../commands/' + categories[i] + '/' + config.commands[j])
    }
  }
}

const categories = [
  "owner",
  "misc",
  "config",
  "votes"
]
