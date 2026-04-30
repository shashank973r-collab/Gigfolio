const Appointment = require('../models/Appointment');
const Auth = require('../models/Auth');

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { workerUsername, jobDescription, preferredDate, preferredTime, address } = req.body;
    
    // Find worker to get their ID
    const worker = await Auth.findOne({ username: workerUsername });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const appointment = new Appointment({
      clientUsername: req.user.username,
      clientId: req.user.id,
      workerUsername,
      workerId: worker._id,
      jobDescription,
      preferredDate,
      preferredTime,
      address
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
};

// GET WORKER NOTIFICATIONS
const getNotifications = async (req, res) => {
  try {
    const appointments = await Appointment.find({ 
      workerUsername: req.user.username 
    }).sort({ createdAt: -1 });

    const unreadCount = await Appointment.countDocuments({ 
      workerUsername: req.user.username, 
      read: false 
    });

    res.json(appointments);
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// MARK AS READ
const markAsRead = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error marking as read' });
  }
};

// UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

module.exports = {
  bookAppointment,
  getNotifications,
  markAsRead,
  updateStatus
};
