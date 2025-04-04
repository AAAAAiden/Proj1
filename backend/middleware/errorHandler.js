const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
  
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ msg: 'Image is too large. Max size is 5MB.' });
    }

    res.status(500).json({ msg: 'Server error', error: err.message });
  };
  
  module.exports = errorHandler;
  