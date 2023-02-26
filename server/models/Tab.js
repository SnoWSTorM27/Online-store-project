const {Schema, model} = require('mongoose')

const schema = new Schema({
  imageSrc: {
    type: String,
    required: true
  }, 
  alt: {
    type: String,
    required: true
  }

}, {
  timestamps: true //Когда создана модель и обновлена
})

module.exports = model('Tab', schema)