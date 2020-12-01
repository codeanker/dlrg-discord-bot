const mongoose = require('mongoose')

module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {useNewUrlParser: true}).catch(console.log) // eslint-disable-line no-console
  mongoose.Promise = global.Promise
  mongoose.pluralize(null)
  mongoose.Promise
  app.set('mongooseClient', mongoose)
}
