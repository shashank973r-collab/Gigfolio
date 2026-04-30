const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  workerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Auth', 
    required: true 
  },
  workerUsername: { type: String, required: true },
  jobTitle: { type: String, required: true },
  clientName: { type: String, required: true },
  jobDate: { type: String, required: true },
  amount: { type: String, required: true },
  description: { type: String },
  reviewToken: { type: String, unique: true },
  tokenUsed: { type: Boolean, default: false },
  review: {
    reviewerName: String,
    rating: Number,
    comment: String,
    submittedAt: Date,
    blockchainHash: String,
    verified: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
