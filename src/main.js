require('./global')

const Server = require('./share/http')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type World {
  name: String
}

type Query {
  hello: World
}

schema {
  query: Query
}
`
const resolvers = {
  Query: {
    hello () {
      return { name: 'world' }
    }
  }
}

const executableSchema = makeExecutableSchema({
  resolvers,
  typeDefs
})

const app = new Server({
  resolvers,
  schema: executableSchema,
  typeDefs
})
app.listen()
