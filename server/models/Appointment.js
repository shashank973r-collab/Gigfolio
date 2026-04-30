const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientUsername: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId },
  workerUsername: { type: String, required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId },
  jobDescription: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
