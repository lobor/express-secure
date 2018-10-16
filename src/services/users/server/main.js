require('./../../../global')

const Server = require('./../../../utils/http')
const wrapperResolver = require('./../../../utils/resolver')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const app = new Server({
  port: 8000,
  resolvers: { Query: wrapperResolver(resolvers.Query) },
  typeDefs,
  dbName: 'toto',
  db: 'mongodb://mongodb:27017'
})

app.listen()
