module.exports = (msg, config) => {
  msg.fail = (title, text) => {
    msg.channel.send('', {
      embed: {
        title,
        description: text,
        color: 15158332,
        timestamp: new Date(),
        footer: {
          icon_url: msg.client.user.avatarURL,
          text: "Brought to you by Democracy Bot"
        },
        author: {
          name: "Democracy",
          url: "https://democracy.maxrumsey.xyz",
          icon_url: msg.client.user.avatarURL
        },
        fields: [
          {
            name: 'Help Command',
            value: config.prefix + 'help'
          }
        ]
      }
    })
  }
  msg.success = (text = 'The action was successfully completed.') => {
    msg.channel.send('', {
      embed: {
        title: 'Success',
        description: text,
        color: 3066993,
        timestamp: new Date(),
        footer: {
          icon_url: msg.client.user.avatarURL,
          text: "Brought to you by Democracy Bot"
        },
        author: {
          name: "Democracy",
          url: "https://democracy.maxrumsey.xyz",
          icon_url: msg.client.user.avatarURL
        },
      }
    })
  }
}
