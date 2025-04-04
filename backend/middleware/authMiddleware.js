
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log("token", token);
  if (!token) {
    return res.status(403).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ msg: 'Token is not valid' });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error when checking admin');
  }
};


module.exports = { checkToken, checkAdmin };