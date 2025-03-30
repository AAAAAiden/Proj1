const mongoose = require('mongoose');
const gridfsStream = require('gridfs-stream');

let gfs;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, useUnifiedTopology: true
    });
    console.log('MongoDB Connected');

    const db = mongoose.connection.db;
    gfs = gridfsStream(db, mongoose.mongo);
    gfs.collection('uploads'); 

  } catch (err) {
    console.error(err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;