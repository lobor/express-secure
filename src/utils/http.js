const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const { ApolloServer } = require('apollo-server-express')
const MongoClient = require('mongodb').MongoClient

const optionsDefault = {
  entrypoint: '/',
  port: 8000,
  typeDefs: false,
  resolvers: false
}

class Server {
  constructor (options) {
    if (!options.resolvers) throw new Error('`resolvers` options is required')
    if (!options.typeDefs) throw new Error('`typeDefs` options is required')

    this.options = Object.assign({}, optionsDefault, options)
    this.app = express()
    this.app.use(helmet({ noCache: true }))
    this.app.use(rateLimit({
      max: 1e2, // 100 reqs per IP per windowMs
      message: 'Too many request served for this IP',
      onLimitReached: (req) => logger.warn(`Rate limited: ${req.ip}`),
      windowMs: 15 * 60 * 1000 // 15 minutes
    }))

    this.server = new ApolloServer({
      resolvers: this.options.resolvers,
      typeDefs: this.options.typeDefs
    })

    this.server.applyMiddleware({ app: this.app, cors: true, path: this.options.entrypoint })
  }

  use (...args) {
    this.app.use(...args)
  }

  all (...args) {
    this.app.all(...args)
  }

  get (...args) {
    this.app.get(...args)
  }

  post (...args) {
    this.app.post(...args)
  }

  put (...args) {
    this.app.put(...args)
  }

  listen () {
    this.app.listen(this.options.port, async () => {
      if (this.options.db && this.options.dbName) {
        this.clientDb = new MongoClient(this.options.db, { useNewUrlParser: true })
        try {
          await this.clientDb.connect()
          this.db = this.clientDb.db(this.options.dbName)
        } catch (e) {
          throw new Error(e)
        }
      }
      logger.info(`server listen on ${this.server.graphqlPath} port`)
    })
  }
}

module.exports = Server
