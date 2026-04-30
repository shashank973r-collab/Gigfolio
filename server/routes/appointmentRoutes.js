const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { 
  bookAppointment, 
  getNotifications, 
  markAsRead, 
  updateStatus 
} = require('../controllers/appointmentController');

router.post('/book', auth, bookAppointment);
router.get('/notifications', auth, getNotifications);
router.put('/read/:id', auth, markAsRead);
router.put('/status/:id', auth, updateStatus);

module.exports = router;
