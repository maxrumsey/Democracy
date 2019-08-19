# Democracy Bot
What is the Democracy Bot? Democracy Bot is a bot that aims to make Discord Servers more democratic and transparent through allowing anyone to submit rules to be voted on.

## Commands
* d!setChannel
Set the channel where the bot posts rules or votes.  [Admin Use Only]
d!setChannel <vote | rules> #channel
eg: d!setChannel vote #vote_for_rules_here
* d!setConfig
Change a configuration value.  [Admin Use Only]
d!setConfig
* d!setup
Setup and configure the bot for first-time use.  [Admin Use Only]
d!setup
* d!about
View information about the bot.
d!about
* d!debug
Debug the bot incase it is not working.
d!debug
* d!help
View this help document.
d!help
* d!eval
Eval a command. [Owner Use Only]
d!eval
eg: d!eval console.log(1);
* d!createBill
Create a bill for a new vote.
d!createBill
* d!listRules
List the currently approved rules.
d!listRules
* d!delete
Delete a rule.  [Admin Use Only]
d!delete vote_id
eg: d!delete 198
* d!veto
Approve or deny a rule.  [Admin Use Only]
d!veto <approve | deny> vote_id
eg: d!veto deny 198

## Vote Statuses:
0: In progress
1: Denied
2: Approved
3: Obsolete
4: Deleted
5: Error-Causing

## Example .env:
```
TOKEN=YOUR.DISCORD.BOT.TOKEN
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=admin1234
DB_NAME=democracy
OWNER=YOUR.DISCORD.USER.ID
```
