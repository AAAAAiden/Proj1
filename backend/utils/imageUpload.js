const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const gridfsStream = require('gridfs-stream');
const path = require('path');
require('dotenv').config();

// Set up GridFS storage
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      bucketName: 'uploads', // The collection name in GridFS
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

// Route to handle image upload
exports.uploadImage = upload.single('image');