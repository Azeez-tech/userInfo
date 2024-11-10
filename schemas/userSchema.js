const mongoose = require('mongoose')
const joi = require('joi')

const userSchema = new mongoose.Schema({
  userName: {type: String, required: true, minlength: 3, maxlength: 150},
  firstName: {type: String, required: true, minlength: 3, maxlength: 200},
  lastName: {type: String, required: true, minlength: 3, maxlength: 200},
  age: {type: Number, required: true, min: 10, max: 150},
  email: {type: String, required: true, minlength: 8, maxlength: 200}
})

const User = mongoose.model('User', userSchema)

async function validateUser(user){
  const schema = {
    userName: joi.string().min(3).required(),
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    age: joi.number().min(10).required(),
    email: joi.string().min(8).required()
  }
  return joi.object(schema).validate(user)
}


exports.User = User
exports.validate = validateUser