const pino = require('pino')
const process = require('process')
const prettifier = require('pino-pretty')

const logger = pino({
  prettifier: options => {
    const prettyLog = prettifier(options)
    return ({ hostname, ...inputData }) => prettyLog(inputData)
  },
  prettyPrint: {
    levelFirst: true,
    translateTime: 'yy/mm/dd-HH:MM:ss'
  }
})
// Set logger in debug mode if DEBUG env variable is set
if (process.env.DEBUG) {
  // 20 = debug, 30 = info, ...
  // See: https://github.com/pinojs/pino/blob/master/docs/api.md#loggerlevel-string-gettersetter
  logger.level = 20
}
module.exports = logger
