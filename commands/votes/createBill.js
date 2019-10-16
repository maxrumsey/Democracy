const discord = require('discord.js');

const types = [
  "",
  "Create",
  "Amend",
  "Remove"
]

module.exports = async (msg, command, args, config) => {
  try {
    const messageFilter = m => m.author.id == msg.author.id;

    // Asking for and determining type of bill (create, amend, remove)
    msg.reply("What type of bill do you want to create? (Reply with the number):\n1)Create Rule\n2)Amend Rule\n3)Remove Rule");
    let typeMessage = await msg.channel.awaitMessages(messageFilter, {
      maxMatches: 1,
      time: 10000
    })
    typeMessage = typeMessage.first();
    if (!typeMessage) return;
    if (!["1","2","3"].includes(typeMessage.content)) {
      return msg.fail('Incorrect Option', 'You specifed an incorrect option. The options available were `1`, `2`, or `3`.')
    }

    // If rule changes / removes another rule:
    let ruleID, ruleContent;
    if (["2", "3"].includes(typeMessage.content)) {
      msg.reply("Please specify the ID of the rule you want to " + types[parseInt(typeMessage.content)] + ".");
      ruleID = await msg.channel.awaitMessages(messageFilter, {
        maxMatches: 1,
        time: 60000
      })
      ruleID = ruleID.first();
      // Checking to ensure rule is active
      let refRule = await global.Database.query("SELECT * FROM `votes` WHERE (server_id = ? AND vote_id = ? AND status = 2)",
        [msg.guild.id, ruleID.content])
      if (!refRule[0]) return msg.fail('Not found', 'Sorry, the rule couldn\'t be found. Are you sure you entered the ID correctly?');
      refRule = await global.Database.query("SELECT * FROM `votes` WHERE (server_id = ? AND reference_vote_id = ? AND status = 0)",
        [msg.guild.id, ruleID.content])
      if (refRule[0]) return msg.fail('Unable to create vote', 'A vote is already in progress for this rule.')
    }

    // Getting content of rule if it is a creation / amendment
    if (["1", "2"].includes(typeMessage.content)) {
      msg.reply("Please type the content of the rule. Be careful, this requires an amendment to change.");
      ruleContent = await msg.channel.awaitMessages(messageFilter, {
        maxMatches: 1,
        time: 60000
      })
      ruleContent = ruleContent.first();
    }

    // Getting reason for changing this
    msg.reply("Please specify your reason for creating/amending/removing this rule.");
    const reason = await msg.channel.awaitMessages(messageFilter, {
      maxMatches: 1,
      time: 60000
    })

    // Constructing embed for vote channel and confirmation message
    const ruleEmbed = {
      description: ruleContent ? 'Rule Content: ' + ruleContent.content : 'Rule Removal of Rule ID: ' + ruleID.content,
      color: 16777215,
      fields: [{
        name: "Action",
        value: types[parseInt(typeMessage.content)] + ' Rule'
      },
      {
        name: "Reason",
        value: reason.first().content
      },
      {
        name: 'Author',
        value: `<@${msg.author.id}>`
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

    // Getting value of mentioned rule
    if (["2", "3"].includes(typeMessage.content)) {
      let refRule = await global.Database.query("SELECT * FROM `votes` WHERE (server_id = ? AND vote_id = ? AND status = 2)",
        [msg.guild.id, ruleID.content]);
      ruleEmbed.fields.push({
        name: 'Mentioned Rule',
        value: refRule[0].contents
      })
    }

    // Confirming message is ok
    await msg.channel.send("Is this ok? Reply with **Yes** to confirm.", {embed: ruleEmbed})
    const confirm = await msg.channel.awaitMessages(messageFilter, {
      maxMatches: 1,
      time: 60000
    })
    if (!confirm.first() || !confirm.first().content.includes("Yes")) return msg.success('Cancelling.')

    if (config.channel_vote_id && config.channel_rules_id) {
      // Adding extra embed options for voting channel
      ruleEmbed.fields.push({
        name: 'Voting',
        value: 'React with ❌ or ✅ to vote!'
      })
      // Posting message in voting channel
      const votemsg = await msg.client.channels.get(config.channel_vote_id).send({embed: ruleEmbed});
      // Adding to DB for each type of bill.
      switch (typeMessage.content) {
        case "1":
          await global.Database.query("INSERT INTO `votes` (server_id, message_id, author_id, contents, reason, type, status, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [msg.guild.id, votemsg.id, msg.author.id, ruleContent.content, reason.first().content, 'create', 0, new Date()])
          break;
        case "2":
          await global.Database.query("INSERT INTO `votes` (server_id, message_id, author_id, contents, reason, type, status, reference_vote_id, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [msg.guild.id, votemsg.id, msg.author.id, ruleContent.content, reason.first().content, 'amend', 0, ruleID.content, new Date()])
          break;
        case "3":
          await global.Database.query("INSERT INTO `votes` (server_id, message_id, author_id, reason, type, status, reference_vote_id, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [msg.guild.id, votemsg.id, msg.author.id, reason.first().content, 'remove', 0, ruleID.content, new Date() ])
          break;
        default:
          return;
      }
      // Adding ID of vote to embed and adding reacts
      let id = await global.Database.query("SELECT vote_id FROM `votes` WHERE message_id = ?", [votemsg.id])
      id = id[0].vote_id;
      ruleEmbed.footer.text = 'ID: ' + id + '. ' + ruleEmbed.footer.text;
      votemsg.edit({embed: ruleEmbed});
      await votemsg.react('❌');
      await votemsg.react('✅');
      // Confirmation message
      await msg.success("Bill created!")
    } else {
      return msg.fail('Setup needed', 'The bill could not be created, the bot has not been fully set up. Run ' + config.prefix + 'debug to see what you are missing and ' + config.prefix + 'setup to setup the bot.')
    }
  } catch (e) {
    console.log(e);
  }
}
