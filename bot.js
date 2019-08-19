if (!process.env.TOKEN) {
  require('dotenv').config();
}

const discord = require('discord.js');
const Client = global.client = new discord.Client();

const framework = require('./framework/');

Client.on('message', framework.handlers.message);
Client.on('ready', framework.handlers.ready);
Client.on('guildCreate', framework.handlers.join);
Client.on('error', e => {
  console.log(e);
})
framework.db()
  .then(() => {
    framework.commands.init(Client);
    Client.login(process.env.TOKEN, (e) => {
      if (e) {
        console.log(e);
        console.log('A fatal error occured. Exiting');
        process.exit(0);
      }
    });
  })
  .catch(e => {
    console.error(e);
    console.log('A fatal error occured. Exiting');
    process.exit(0);
  })
