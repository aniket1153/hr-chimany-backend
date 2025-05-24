const JobPost = require('../models/Jobpostmodel');
const Interview = require('../models/interviewmodel');
const Offer = require('../models/offer');
const Candidate = require('../models/Candidate');


// --------------- CANDIDATES -----------------

exports.createCandidate = async (req, res) => {
  try {
    const { name, contact, email, gender, experience, role } = req.body;

    if (!name || !contact || !email || !gender || !experience || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const candidate = new Candidate({
      name,
      contact,
      email,
      gender,
      experience,
      role,
      createdBy: req.user.id, 
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate created successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// --------------- JOB POSTS -----------------

exports.createJobPost = async (req, res) => {
  try {
    const { title, company, description, requirements, location, status } = req.body;

    const jobPost = new JobPost({
      title,
      company,
      description,
      requirements,
      location,
      status,
      postedBy: req.user.id,
    });

    await jobPost.save();
    res.status(201).json(jobPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find().populate('postedBy', 'name email');
    res.json(jobPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobPostById = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id).populate('postedBy', 'name email');
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    res.json(jobPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    res.json(jobPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    res.json({ message: 'Job post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------- INTERVIEWS -----------------

exports.scheduleInterview = async (req, res) => {
  try {
    const { jobPost, candidateName, scheduledDate, status, feedback } = req.body;

    const interview = new Interview({
      jobPost,
      candidateName,
      scheduledDate,
      status,
      feedback,
    });

    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('jobPost', 'title company')
      .sort({ scheduledDate: 1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate('jobPost', 'title company');
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json({ message: 'Interview deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------- OFFERS -----------------

exports.createOffer = async (req, res) => {
  try {
    const { candidateName, jobPost, offeredDate, salaryPackage, status } = req.body;

    const offer = new Offer({
      candidateName,
      jobPost,
      offeredDate,
      salaryPackage,
      status,
    });

    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate('jobPost', 'title company');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('jobPost', 'title company');
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------- REPORT -----------------

exports.getRecruitmentReport = async (req, res) => {
  try {
    const { jobPostId } = req.params;

    const totalApplicants = await Interview.countDocuments({ jobPost: jobPostId });
    const totalInterviews = await Interview.countDocuments({ jobPost: jobPostId, status: 'completed' });
    const totalOffers = await Offer.countDocuments({ jobPost: jobPostId });
    const acceptedOffers = await Offer.countDocuments({ jobPost: jobPostId, status: 'accepted' });

    res.json({
      jobPostId,
      totalApplicants,
      totalInterviews,
      totalOffers,
      acceptedOffers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
