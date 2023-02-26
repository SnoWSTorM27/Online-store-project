const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  image: String
}, {
  timestamps: true //Когда создана модель и обновлена
})

module.exports = model('Good', schema)