const Product = require('../models/product');
const { uploadImage } = require('../utils/imageUpload');

// Create product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, quantity } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ msg: 'No image uploaded' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image: image.id,
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Route to fetch image by ID
exports.getProductImage = async (req, res) => {
  const fileId = req.params.id;

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
    if (err || !file) {
      return res.status(404).json({ msg: 'No file found' });
    }

    // Set the content type and send the file as response
    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType);
    readstream.pipe(res);
  });
};

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Edit product by ID
exports.editProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};