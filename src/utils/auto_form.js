const Joi = require('joi')
const omit = require('lodash/omit')

module.exports = {
  validate (schema, args) {
    let validate = {}
    Object.keys(schema).map((keyName) => {
      if (!schema[keyName].type || !Joi[schema[keyName].type]) throw new Error(`'type' in model '${keyName}' is required`)
      validate[keyName] = Joi[schema[keyName].type]()
      Object.keys(omit(schema[keyName], ['type'])).map((key) => {
        validate[keyName] = validate[keyName][key]()
      })
    })
    return Joi.validate(args, Joi.object().keys(validate))
  }
}
