const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  workerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Auth', 
    required: true 
  },
  workerUsername: { type: String, required: true },
  
  aadhaar: {
    status: { 
      type: String, 
      enum: ['pending', 'verified', 'failed'],
      default: 'pending'
    },
    number: { type: String, default: '' },
    name: { type: String, default: '' },
    verifiedAt: { type: Date }
  },
  
  drivingLicense: {
    status: {
      type: String,
      enum: ['pending', 'verified', 'failed'],
      default: 'pending'
    },
    number: { type: String, default: '' },
    verifiedAt: { type: Date }
  },
  
  policeVerification: {
    status: {
      type: String,
      enum: ['pending', 'clear', 'flagged'],
      default: 'pending'
    },
    reportNumber: { type: String, default: '' },
    verifiedAt: { type: Date }
  },
  
  overallStatus: {
    type: String,
    enum: ['unverified', 'partial', 'verified'],
    default: 'unverified'
  },
  
  blockchainHash: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Verification', verificationSchema);
