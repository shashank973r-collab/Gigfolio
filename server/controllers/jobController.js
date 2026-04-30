const Job = require('../models/Job');
const Auth = require('../models/Auth');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

exports.createJob = async (req, res) => {
  try {
    const { jobTitle, clientName, jobDate, amount, description } = req.body;
    const reviewToken = uuidv4();
    
    const newJob = new Job({
      workerId: req.user.userId,
      workerUsername: req.user.username,
      jobTitle,
      clientName,
      jobDate,
      amount,
      description,
      reviewToken
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ workerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getTokenInfo = async (req, res) => {
  try {
    const job = await Job.findOne({ reviewToken: req.params.token });
    if (!job) return res.status(404).json({ message: 'Invalid QR code' });
    if (job.tokenUsed) return res.status(400).json({ message: 'This QR has already been used' });
    
    res.json({
      workerUsername: job.workerUsername,
      jobTitle: job.jobTitle,
      clientName: job.clientName,
      jobDate: job.jobDate,
      valid: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const { token } = req.params;
    const job = await Job.findOne({ reviewToken: token });
    if (!job) return res.status(404).json({ message: 'Invalid QR code' });
    if (job.tokenUsed) return res.status(400).json({ message: 'This review link has already been used' });

    const { reviewerName, rating, comment } = req.body;
    
    const hashData = JSON.stringify({
      token, reviewerName, rating, 
      comment, timestamp: Date.now()
    });
    
    const blockchainHash = '0x' + crypto.createHash('sha256')
      .update(hashData).digest('hex')
      .substring(0, 40);

    job.tokenUsed = true;
    job.review = {
      reviewerName,
      rating,
      comment,
      submittedAt: new Date(),
      blockchainHash,
      verified: true
    };

    await job.save();

    // Update worker's rating and jobs completed
    const worker = await Auth.findById(job.workerId);
    if (worker) {
      worker.jobsCompleted = (worker.jobsCompleted || 0) + 1;
      
      // Calculate new average rating
      const allReviewedJobs = await Job.find({ workerId: job.workerId, tokenUsed: true });
      if (allReviewedJobs.length > 0) {
        const totalRating = allReviewedJobs.reduce((sum, j) => sum + (j.review?.rating || 0), 0);
        worker.rating = (totalRating / allReviewedJobs.length).toFixed(1);
      } else {
        worker.rating = rating;
      }
      
      await worker.save();
    }

    res.json({ success: true, blockchainHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
