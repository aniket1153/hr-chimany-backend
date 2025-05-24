const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },              
  company: { type: String, required: true },
  description: { type: String },
  requirements: [String],
  location: { type: String },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);
