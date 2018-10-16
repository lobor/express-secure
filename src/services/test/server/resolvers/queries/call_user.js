var graphql = require('graphql.js')

module.exports = {
  resolve: async () => {
    var graph = graphql('http://user:8000/', {
      asJSON: true
    })
    try {
      const toto = await graph.query(`helloToto($token: ID!){checkRight(token: $token)}`, { token: 'vfjnvfkdjn' })
      return toto.checkRight
    } catch (e) {
      logger.error(e)
      return false
    }
  },
  validate: {
    token: { required: true, type: 'string' }
  }
}
