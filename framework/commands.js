exports.handle = async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type !== 'text') return;

  let prefix = await global.Database.query("SELECT `prefix` FROM `servers` WHERE server_id = ?", msg.guild.id)
  if (!prefix[0]) {
    await global.Database.query("INSERT INTO `servers` (server_id, vote_margin, vote_time, prefix) VALUES (?, ?, ?, ?)",
      [msg.guild.id, 1, '1 d', 'd!'])
    prefix = 'd!'
  } else {
    prefix = prefix[0].prefix;
  }
  if (!msg.content.startsWith(prefix)) return;
  let config = await global.Database.query("SELECT * FROM `servers` WHERE server_id = ?", msg.guild.id)

  let command = msg.content.split(' ')[0].split('')
  for (var i = 0; i < prefix.length; i++) {
    command.shift();
  }
  command = command.join('');
  if (global.commands[command]) {
    let args = msg.content.split(' ');
    args.shift();
    try {
      await global.commands[command](msg, commands, args, config[0]);
    } catch (e) {
      try {
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
