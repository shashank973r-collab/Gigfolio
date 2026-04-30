const express = require('express');
const router = express.Router();
const clientAuthController = require('../controllers/clientAuthController');

router.post('/signup', clientAuthController.signup);
router.post('/login', clientAuthController.login);

module.exports = router;
