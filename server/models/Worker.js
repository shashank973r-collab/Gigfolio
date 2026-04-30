const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    skills: [{ type: String }],
    hourlyRate: { type: Number },
    portfolioItems: [{
        title: String,
        description: String,
        imageUrl: String,
        link: String
    }],
    blockchainIdentity: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Worker', WorkerSchema);
