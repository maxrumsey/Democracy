module.exports = [
  `CREATE TABLE IF NOT EXISTS servers (
    id INT AUTO_INCREMENT,
    server_id TEXT NOT NULL,
    vote_margin FLOAT NOT NULL,
    vote_time TEXT NOT NULL,
    admin_role TEXT,
    prefix TEXT NOT NULL,
    channel_vote_id TEXT,
    channel_rules_id TEXT,
    PRIMARY KEY (id)
  )`,
  `CREATE TABLE IF NOT EXISTS votes (
    vote_id INT AUTO_INCREMENT,
    server_id TEXT NOT NULL,
    message_id TEXT NOT NULL,
    author_id TEXT NOT NULL,
    contents TEXT,
    reason TEXT NOT NULL,
    reference_vote_id INT,
    type TEXT NOT NULL,
    status INT NOT NULL,
    created DATETIME NOT NULL,
    PRIMARY KEY (vote_id)
  )`
]
