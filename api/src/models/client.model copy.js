// activity-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const client = new Schema({
    botToken: { type: String, required: true },
    settings: { type: Schema.Types.ObjectId, required: true },
  }, {
    timestamps: true
  })

  return mongooseClient.model('client', client)
}
