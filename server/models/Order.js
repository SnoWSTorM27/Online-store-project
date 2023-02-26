const {Schema, model} = require('mongoose')

const schema = new Schema({
  total: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  goods: [ { goodId: { type: Schema.Types.ObjectId, ref: 'Good' }, quantity: {type: String, require: true, min: 1}, price: Number } ]
}, {
  timestamps: true //Когда создана модель и обновлена
})

module.exports = model('Order', schema)