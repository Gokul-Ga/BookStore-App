const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    // Check if the user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('Email is already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Redirect 
    const redirectUrl = '/login';

    res.status(200).json({
      message: 'Registration Successful',
      redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: 'Login Successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

























