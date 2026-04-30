const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getStatus, verifyAadhaar, verifyLicense, verifyPolice } = require('../controllers/verificationController');

router.get('/status', auth, getStatus);
router.post('/aadhaar', auth, verifyAadhaar);
router.post('/license', auth, verifyLicense);
router.post('/police', auth, verifyPolice);

module.exports = router;
