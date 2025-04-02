const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("config/db: MONGODB_URI is not defined");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected'); 
  } catch (err) {
    console.error("config/db: MongoDB not connected: ", err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;