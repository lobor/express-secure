module.exports = `
type Query {
  checkRight(token: ID!): Boolean!
}

schema {
  query: Query
}
`
