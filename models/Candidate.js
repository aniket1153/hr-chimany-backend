
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  gender: String,
  experience: String,
  role: String,
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
