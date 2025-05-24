const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
  candidateName: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  feedback: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
