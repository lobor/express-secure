module.exports = `
type Query {
  callUser(token: ID!): Boolean!
}

schema {
  query: Query
}
`
