const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    console.log('Signup body received:', req.body);
    const { fullName, username, password } = req.body;
    
    if (!fullName || !username || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    const existingClient = await Client.findOne({ username });
    if (existingClient) {
      return res.status(400).json({ 
        message: 'Username already taken' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newClient = new Client({
      fullName,
      username,
      password: hashedPassword
    });

    await newClient.save();
    
    return res.status(201).json({ 
      message: 'Account created successfully' 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      message: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const client = await Client.findOne({ username });
    if (!client) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { clientId: client._id, username: client.username, role: 'client' },
      process.env.JWT_SECRET || 'supersecretjwt',
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      token, 
      username: client.username, 
      role: 'client' 
    });
  } catch (error) {
    console.error('Client login error:', error);
    res.status(500).json({ message: 'Server error during client login' });
  }
};
