const Collection = require('mongodb/lib/collection')

class CollectionContainer extends Collection {
  find (...args) {
    logger.info('Call %s with %o', [this.name])
    return super.find(...args)
  }
}
module.exports = CollectionContainer
