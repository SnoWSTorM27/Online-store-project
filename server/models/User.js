const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {type: String},
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: String,
  sex: {type: String, enum: ['male', 'female', 'other']},
  role: {type: String, default: "USER", enum: ['ADMIN', 'USER']}
}, {
  timestamps: true //Когда создана модель и обновлена
})

module.exports = model('User', schema)