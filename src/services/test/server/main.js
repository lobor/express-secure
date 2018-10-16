require('./../../../global')

const Server = require('./../../../utils/http')
const wrapperResolver = require('./../../../utils/resolver')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const app = new Server({
  port: 8080,
  resolvers: { Query: wrapperResolver(resolvers.Query) },
  typeDefs,
  db: 'http://mongodb:3001'
})
app.listen()
