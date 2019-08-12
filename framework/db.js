const defaultStrings = require('./dbCreations');
const mysql = require('mysql');

module.exports = () => { return new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });
  connection.connect(async err => {
    if (err) return reject(err);
    for (var i = 0; i < defaultStrings.length; i++) {
      try {
        await global.Database.query(defaultStrings[i]);
      } catch (e) {
        console.log(e);
        process.exit(0);
      }
    }
    return resolve();
  });
  global.Database = new Database(connection)


})}

class Database {
  constructor(connection) {
    this.connection = connection;
  }
  query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
  formatRule(vote) {
    const embed = {
      description: vote.contents,
      timestamp: new Date(),
      footer: {
        text: "ID: " + vote.vote_id + ". Brought to you by Democracy Bot"
      },
      author: {
        name: "Democracy",
        url: "https://democracy.maxrumsey.xyz"
      }
    }
    return {embed}
  }
  action(text, vote) {
    const embed = {
      description: text,
      timestamp: new Date(),
      footer: {
        text: "ID: " + vote.vote_id + ". Brought to you by Democracy Bot"
      },
      fields: [{
        name: 'Author',
        value: `<@${vote.author_id}>`
      }],
      author: {
        name: "Democracy",
        url: "https://democracy.maxrumsey.xyz"
      }
    }
    return {embed}
  }
  async idtomessage(vote_id) {
    const q = await this.query("SELECT message_id FROM `votes` WHERE vote_id = ?", [vote_id]);
    return q[0].message_id;
  }
  async isAdmin(member, config) {
    if (member.hasPermission("MANAGE_GUILD")) return true;
    const roles = await member.roles;
    if (roles.get(config.admin_role)) return true;
    return false;
  }
}
