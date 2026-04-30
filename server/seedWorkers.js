require('dotenv').config();
const mongoose = require('mongoose');
const Auth = require('./models/Auth');

const seedWorkers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trustwork');
    console.log('MongoDB connected.');

    const result = await Auth.updateMany({}, {
      $set: {
        jobTitle: "Licensed Electrician",
        skills: "Electrical, Wiring, Panel Installation",
        category: "Electrician",
        rating: 4.5,
        jobsCompleted: 127,
        isVerified: true
      }
    });

    console.log(`Updated ${result.modifiedCount} accounts.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedWorkers();
