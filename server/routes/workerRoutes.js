const express = require('express');
const router = express.Router();
const { getAllWorkers, getWorkerById, registerWorker } = require('../controllers/workerController');

router.get('/', getAllWorkers);

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || ''
    const Worker = require('../models/Worker')
    const Auth = require('../models/Auth')
    
    let workers
    if (query === '') {
      workers = await Auth.find({}).select(
        'username jobTitle skills category rating jobsCompleted isVerified'
      )
    } else {
      workers = await Auth.find({
        $or: [
          { username: { $regex: query, $options: 'i' }},
          { jobTitle: { $regex: query, $options: 'i' }},
          { skills: { $regex: query, $options: 'i' }},
          { category: { $regex: query, $options: 'i' }}
        ]
      }).select(
        'username jobTitle skills category rating jobsCompleted isVerified'
      )
    }
    res.json(workers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', getWorkerById);
router.post('/register', registerWorker);

module.exports = router;
