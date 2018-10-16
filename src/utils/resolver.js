const { validate } = require('./auto_form')

module.exports = (resolvers) => {
  let wrappedResolvers = {}
  Object.keys(resolvers).map((name) => {
    const resolver = resolvers[name]
    wrappedResolvers[name] = async (obj, args, context, info) => {
      const logArgs = [name]
      let logMsg = '%s called'
      if (Object.keys(args).length > 0) {
        logArgs.push(args)
        logMsg += ' with %o'
      }
      logger.info(logMsg, ...logArgs)
      try {
        if (resolver.validate) {
          await validate(resolver.validate, args)
        }

        return resolver.resolve(obj, args, context, info)
      } catch (error) {
        logger.error(error, '%s: Failed: %s', name, JSON.stringify(error.message))
        return error
      }
    }
  })
  return wrappedResolvers
}
