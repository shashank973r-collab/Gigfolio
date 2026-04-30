const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndexes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const db = mongoose.connection.db;
    const collection = db.collection('clients');

    // List all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes on clients collection:');
    console.log(JSON.stringify(indexes, null, 2));

    // Drop the email index if it exists
    const emailIndexExists = indexes.find(idx => idx.key && idx.key.email !== undefined);
    if (emailIndexExists) {
      console.log('Found email index, dropping it...');
      await collection.dropIndex('email_1');
      console.log('Email index dropped successfully!');
    } else {
      console.log('No email index found.');
    }

    // Show final indexes
    const finalIndexes = await collection.indexes();
    console.log('Final indexes:');
    console.log(JSON.stringify(finalIndexes, null, 2));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Done. Disconnected.');
    process.exit(0);
  }
}

fixIndexes();
