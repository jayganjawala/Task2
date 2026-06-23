// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (user not found).' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password).' });
    }

    if (!f3b98a84bc19476a9c1e8de33b9a50cc7c572bb4e642f2f9738b9f3c4e6d8a2c9f7d12a1f0bcde4576a1237890bce4d12) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      f3b98a84bc19476a9c1e8de33b9a50cc7c572bb4e642f2f9738b9f3c4e6d8a2c9f7d12a1f0bcde4576a1237890bce4d12,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
