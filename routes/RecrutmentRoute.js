const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleawre/AuthMIddleware');
const recruitmentController = require('../controller/RecruitmentController');

// ----- Job Posts -----
// Create Job Post (only HR or Admin)
router.post('/jobposts', authenticate, authorize('hr', 'admin'), recruitmentController.createJobPost);

// Get all Job Posts (any logged in user)
router.get('/jobposts', authenticate, recruitmentController.getAllJobPosts);

// Get Job Post by ID (any logged in user)
router.get('/jobposts/:id', authenticate, recruitmentController.getJobPostById);

// Update Job Post (HR only)
router.put('/jobposts/:id', authenticate, authorize('hr'), recruitmentController.updateJobPost);

// Delete Job Post (HR only)
router.delete('/jobposts/:id', authenticate, authorize('hr'), recruitmentController.deleteJobPost);


// ----- Interviews -----
// Schedule Interview (HR or Admin)
router.post('/interviews', authenticate, authorize('hr', 'admin'), recruitmentController.scheduleInterview);

// Get all Interviews (any logged in user)
router.get('/interviews', authenticate, recruitmentController.getAllInterviews);

// Get Interview by ID (any logged in user)
router.get('/interviews/:id', authenticate, recruitmentController.getInterviewById);

// Update Interview (HR only)
router.put('/interviews/:id', authenticate, authorize('hr'), recruitmentController.updateInterview);

// Delete Interview (HR only)
router.delete('/interviews/:id', authenticate, authorize('hr'), recruitmentController.deleteInterview);


// ----- Offers -----
// Create Offer (HR or Admin)
router.post('/offers', authenticate, authorize('hr', 'admin'), recruitmentController.createOffer);

// Get all Offers (any logged in user)
router.get('/offers', authenticate, recruitmentController.getAllOffers);

// Get Offer by ID (any logged in user)
router.get('/offers/:id', authenticate, recruitmentController.getOfferById);

// Update Offer (HR only)
router.put('/offers/:id', authenticate, authorize('hr'), recruitmentController.updateOffer);

// Delete Offer (HR only)
router.delete('/offers/:id', authenticate, authorize('hr'), recruitmentController.deleteOffer);


// ----- Reports -----
// Get Recruitment Report for a Job Post (any logged in user)
router.get('/report/:jobPostId', authenticate, recruitmentController.getRecruitmentReport);



// ----- Candidates -----
// Create Candidate (HR or Admin)
router.post('/candidates', authenticate, authorize('hr', 'admin'), recruitmentController.createCandidate);

// Get all Candidates (any logged in user)
router.get('/candidates', authenticate, recruitmentController.getAllCandidates);

// Get Candidate by ID (any logged in user)
router.get('/candidates/:id', authenticate, recruitmentController.getCandidateById);

// Update Candidate (HR only)
router.put('/candidates/:id', authenticate, authorize('hr'), recruitmentController.updateCandidate);

// Delete Candidate (HR only)
router.delete('/candidates/:id', authenticate, authorize('hr'), recruitmentController.deleteCandidate);
// Get Candidates by Job Post ID (any logged in user)




module.exports = router;
