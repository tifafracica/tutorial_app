const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tutorial must have a title']
  },
  description: {
    type: String,
    required: [true, 'Tutorial must have a description']
  },
  published: {
    type: Boolean,
    default: false
  },
},//timestamps: true -> tells Mongoose to automatically manage createdAt and updatedAt properties on my documents.
  { timestamps: true }
);

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;