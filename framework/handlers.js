const { setIntervalAsync } = require('set-interval-async/dynamic')
exports.message = msg => {
  require('./index.js').commands.handle(msg);
}
exports.ready = () => {
  console.log("Bot has started.")
  setIntervalAsync(
    async () => {await require('./index.js').checker(global.client)},
    1000
  )
}
