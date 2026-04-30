const mongoose = require('mongoose');
require('dotenv').config();
const Auth = require('./models/Auth');

const titles = ["Tutor", "Plumber", "Gig Worker", "Carpenter", "Licensed Electrician"];

const randomize = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const workers = await Auth.find({});
    console.log(`Found ${workers.length} workers. Randomizing...`);

    for (const worker of workers) {
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      worker.jobTitle = randomTitle;
      // Also randomize jobsCompleted and rating for more realism
      worker.jobsCompleted = Math.floor(Math.random() * 200) + 50;
      worker.rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
      worker.isVerified = true;
      await worker.save();
    }
    
    console.log('Successfully randomized worker roles.');
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

randomize();
