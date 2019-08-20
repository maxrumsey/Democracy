const discord = require('discord.js');
module.exports = (msg, command, args) => {
  const embeds = [
    {
      "description": "Config Commands",
      "timestamp": new Date(),
      "footer": {
        "icon_url": msg.client.user.avatarURL,
        "text": "Brought to you by Democracy Bot"
      },
      "author": {
        "name": "Democracy",
        "url": "https://democracy.maxrumsey.xyz",
        "icon_url": msg.client.user.avatarURL
      },
      "fields": [
        {
          "name": "d!setChannel",
          "value": "Set the channel where the bot posts rules or votes. [Admin Use Only]\nd!setChannel <vote | rules> #channel\neg: d!setChannel vote #vote_for_rules_here"
        },
        {
          "name": "d!setConfig",
          "value": "Change a configuration value. [Admin Use Only]\nd!setConfig"
        },
        {
          "name": "d!setup",
          "value": "Setup the bot for first time use. [Admin Use Only]\nd!setup"
        },
        {
          "name": "d!listConfig",
          "value": "List the configuration of the current server.\nd!listConfig"
        },
        {
          "name": "d!wipeRules",
          "value": "Wipe and delete all the currently active rules. [Admin Use Only]\nd!wipeRules"
        }
      ]
    },
    {
      "description": "Miscellanous Commands",
      "timestamp": new Date(),
      "footer": {
        "icon_url": msg.client.user.avatarURL,
        "text": "Brought to you by Democracy Bot"
      },
      "author": {
        "name": "Democracy",
        "url": "https://democracy.maxrumsey.xyz",
        "icon_url": msg.client.user.avatarURL
      },
      "fields": [
        {
          "name": "d!about",
          "value": "View information about the bot.\nd!about"
        },
        {
          "name": "d!debug",
          "value": "Debug the bot incase it is not working.\nd!debug"
        },
        {
          "name": "d!help",
          "value": "View this help document.\nd!help"
        },
        {
          "name": "d!ping",
          "value": "Pings the bot.\nd!ping"
        }
      ]
    },
    {
      "description": "Owner Commands",
      "timestamp": new Date(),
      "footer": {
        "icon_url": msg.client.user.avatarURL,
        "text": "Brought to you by Democracy Bot"
      },
      "author": {
        "name": "Democracy",
        "url": "https://democracy.maxrumsey.xyz",
        "icon_url": msg.client.user.avatarURL
      },
      "fields": [
        {
          "name": "d!eval",
          "value": "Eval a command. [Owner Use Only]\nd!eval\neg: d!eval console.log(1);"
        }
      ]
    },
    {
      "description": "Voting Commands",
      "timestamp": new Date(),
      "footer": {
        "icon_url": msg.client.user.avatarURL,
        "text": "Brought to you by Democracy Bot"
      },
      "author": {
        "name": "Democracy",
        "url": "https://democracy.maxrumsey.xyz",
        "icon_url": msg.client.user.avatarURL
      },
      "fields": [
        {
          "name": "d!createBill",
          "value": "Create a bill for a new vote.\nd!createBill"
        },
        {
          "name": "d!listRules",
          "value": "List the currently approved rules.\nd!listRules"
        },
        {
          "name": "d!delete",
          "value": "Delete a rule. [Admin Use Only]\nd!delete vote_id\neg: d!delete 198"
        },
        {
          "name": "d!veto",
          "value": "Approve or deny a rule. [Admin Use Only]\nd!veto <approve | deny> vote_id\neg: d!veto deny 198"
        }
      ]
    },
  ]

  msg.reply('Check your DMs.')
  for (var i = 0; i < embeds.length; i++) {
    msg.author.send({embed: embeds[i]});
  }
}
