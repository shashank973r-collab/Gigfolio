const Worker = require('../models/Worker');
const Verification = require('../models/Verification');
const Review = require('../models/Review');

const getAllWorkers = async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) return res.status(404).json({ message: 'Worker not found' });
        
        const verification = await Verification.findOne({ workerId: req.params.id });
        const reviews = await Review.find({ workerId: req.params.id });
        
        res.json({ worker, verification, reviews });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const registerWorker = async (req, res) => {
    try {
        const newWorker = new Worker(req.body);
        const savedWorker = await newWorker.save();
        res.status(201).json(savedWorker);
    } catch (error) {
        res.status(400).json({ message: 'Validation Error', error: error.message });
    }
};

module.exports = { getAllWorkers, getWorkerById, registerWorker };
