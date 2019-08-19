# Democracy Bot
What is Democracy Bot? Democracy Bot is a bot that aims to make Discord Servers more democratic and transparent through allowing anyone to submit rules to be voted on.

|Support Server|Invite Link|
|---|---|
|https://discord.gg/Hg4vaKs|[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=610299806123819018&permissions=76800&scope=bot)|

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

## How to get started with the bot
1. [Invite the bot](https://discordapp.com/api/oauth2/authorize?client_id=610299806123819018&permissions=76800&scope=bot)
2. Set the channels where votes and rules are published: `d!setChannel vote/rules #channel`
3. Optional: If required, change configuration values with the command: `d!setConfig`

## Vote Statuses:
In the database, the status of a vote is referred to with an integer from 0 to 5. Each number corresponds to a differnet status.
- 0: In progress (A newly created vote)
- 1: Denied (Not approved in the voting process)
- 2: Approved (An approved vote for the creation of a rule)
- 3: Obsolete (An approved vote for the amendment / changing of a rule)
- 4: Deleted (Deleted by an administrator)
- 5: Error-Causing (Not currently In use)

## Selfhosting
Selfhosting Democracy Bot is easy. It requires a MySQL database running.
1. Clone the repository: `$ git clone https://github.com/maxrumsey/Democracy`
2. Install dependencies: `$ npm install`
3. Copy and Fillout the ENV template below: `nano .env`
4. Run the bot with `$ ndoe bot.js`

## Example .env:
```
TOKEN=YOUR.DISCORD.BOT.TOKEN
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=admin1234
DB_NAME=democracy
OWNER=YOUR.DISCORD.USER.ID
```
