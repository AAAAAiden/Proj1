const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign up user
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    let existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'Username or email already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      role: role || 'regular',
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id, username: user.username} };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, username: user.username, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Sign in user
exports.signin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
      return res.status(400).json({ msg: 'No matched user' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, user: user.username}  };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.setHeader('x-auth-token', token);
      res.json({ token, username: user.username, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Optionally check if email exists
    // const user = await User.findOne({ email });
    // if (!user) return res.status(400).json({ msg: 'Email not found' });

    // Just simulate sending an email
    console.log(`Mock: Sent password recovery email to ${email}`);

    // Respond with success
    res.json({ success: true, msg: 'Recovery email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Check availability for username/email
exports.checkAvailability = async (req, res) => {
  const { field, value } = req.query;
  if (!['username', 'email'].includes(field)) {
    return res.status(400).json({ msg: 'Invalid field' });
  }

  try {
    const exists = await User.findOne({ [field]: value });
    res.json({ available: !exists });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};