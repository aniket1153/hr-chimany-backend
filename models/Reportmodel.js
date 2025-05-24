const mongoose = require('mongoose');

const recruitmentReportSchema = new mongoose.Schema({
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' },
  totalApplicants: { type: Number, default: 0 },
  totalInterviews: { type: Number, default: 0 },
  totalOffers: { type: Number, default: 0 },
  acceptedOffers: { type: Number, default: 0 },
  generatedOn: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('RecruitmentReport', recruitmentReportSchema);
