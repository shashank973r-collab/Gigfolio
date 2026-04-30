const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  jobTitle: { type: String, default: "Gig Worker" },
  skills: { type: String, default: "" },
  category: { type: String, default: "General" },
  rating: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Auth', AuthSchema);
