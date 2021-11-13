const mongoose = require('mongoose')

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  password: String
})

module.exports = Users