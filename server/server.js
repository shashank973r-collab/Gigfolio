const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const workerRoutes = require('./routes/workerRoutes');
const verifyRoutes = require('./routes/verificationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const clientAuthRoutes = require('./routes/clientAuthRoutes');
const jobRoutes = require('./routes/jobRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://10.11.242.44:5173'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Connection Error: ', err));

app.use('/api/workers', workerRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/client', clientAuthRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/appointments', appointmentRoutes);


app.get('/', (req, res) => {
  res.send('Trustwork API running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
