// activity-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const client = new Schema({
    userId: { type: String, required: true },
    channelId: { type: Schema.Types.ObjectId, required: true },
  }, {
    timestamps: true
  })

  return mongooseClient.model('customChannel', client)
}
