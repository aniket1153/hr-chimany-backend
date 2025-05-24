const express = require('express');
const router = express.Router();

const {
  createReport,
  getReports,
  updateReport,
  deleteReport
} = require('../controller/Reportcontroller');

const { authenticate, authorize } = require('../middleawre/AuthMIddleware');

router.get('/', authenticate, getReports);
router.post('/', authenticate, authorize('hr'), createReport);
router.put('/:id', authenticate, authorize('admin'), updateReport);
router.delete('/:id', authenticate, authorize('admin'), deleteReport);

module.exports = router;
