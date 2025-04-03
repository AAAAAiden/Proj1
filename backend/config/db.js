const mongoose = require('mongoose');

const MAX_RETRIES = 5;
let attempts = 0;

const connectDB = async () => {
  while (attempts < MAX_RETRIES) {
    try {
      if (!process.env.MONGODB_URI) {
        console.error('MongoDB_URI not defined');
        process.exit(1);
      }

      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected');
      break;
    } catch (err) {
      attempts++;
      console.error(`MongoDB connection attempt ${attempts} failed: ${err.message}`);
      if (attempts >= MAX_RETRIES) {
        console.error('Max retries reached. Exiting.');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, 3000)); // wait 3 seconds
    }
  }
};


module.exports = connectDB;