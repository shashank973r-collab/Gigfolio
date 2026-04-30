const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { 
  createJob, getMyJobs, 
  getTokenInfo, submitReview 
} = require('../controllers/jobController');

router.post('/create', auth, createJob);
router.get('/myjobs', auth, getMyJobs);
router.get('/review/:token', getTokenInfo);
router.post('/review/:token', submitReview);

module.exports = router;
