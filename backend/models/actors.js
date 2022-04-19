const mongoose = require('mongoose')

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A actor must have a name']
  },
  photo: {
    type: String
  },
  dob: {
    type: Date
  }
})

const Actor = mongoose.model('Actor', actorSchema)

module.exports = Actor
