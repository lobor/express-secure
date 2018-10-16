const Users = require('../../collections')

module.exports = {
  async resolve (obj, args, context) {
    const toto = await Users.find()
    logger.info(toto)
    return true
  },
  validate: {
    token: { required: true, type: 'string' }
  }
}
