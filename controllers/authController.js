const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/db');
const User = require('../models/user');

// Register 
const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password, address });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //const payload = { user: { id: user.id } };
    //const token = jwt.sign(payload, "Supriya", { expiresIn: '1h' });

    res.status(201).json({ message:'user registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login 
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "Supriya");

    res.status(200).json({ message:"login successfully",token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser };