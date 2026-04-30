const express = require('express');
const router = express.Router();
const { requestVerification, getVerificationStatus } = require('../controllers/verifyController');

router.post('/request', requestVerification);
router.get('/status/:workerId', getVerificationStatus);

module.exports = router;
