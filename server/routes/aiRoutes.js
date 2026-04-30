const express = require('express');
const router = express.Router();
const { recommendWorkers } = require('../controllers/aiController');

router.post('/recommend', recommendWorkers);

module.exports = router;
