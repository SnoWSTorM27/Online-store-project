const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  image: {
    type: String,
    required: true
  }

}, {
  timestamps: true //Когда создана модель и обновлена
})

module.exports = model('Category', schema)