const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
  offeredDate: { type: Date, required: true },             
  salaryPackage: { type: Number },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
