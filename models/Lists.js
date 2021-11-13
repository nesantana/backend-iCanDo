const mongoose = require('mongoose')

const Lists = mongoose.model('Lists', {
  user: String,
  name: String,
  status: String,
  items: [
    {
      name: String,
      status: String
    }
  ],
})

module.exports = Lists