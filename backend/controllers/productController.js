const Product = require('../models/product');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    if (!req.file || !req.file.location) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    const imageUrl = req.file.location;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image: imageUrl,
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error('controllers/productController.js: ', err.message);
    res.status(500).json({ msg: 'Server Error when create new product' });
  }
};


// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('controllers/productController.js: ', err.message);
    res.status(500).json({msg: 'Server Error when listing all products'});
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
    res.status(500).json({msg: 'Server Error'});
  }
};

// Edit product by ID
exports.editProductById = async (req, res) => {
  try {
    const updatedFields = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    if (req.file && req.file.location) {
      updatedFields.image = req.file.location;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error('controllers/productController.js: ', err.message);
    res.status(500).json({ msg: 'Server Error when editing product' });
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
    res.status(500).json({msg: 'Server Error'});
  }
};

exports.checkProductName = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ msg: 'Name is required' });

  try {
    const exists = await Product.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    res.json({ exists: !!exists });
  } catch (err) {
    console.error('controllers/productController.js: ', err);
    res.status(500).json({ msg: 'Server Error when checking name' });
  }
};

// Search products by name
exports.searchProducts = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive match
    const products = await Product.find({ name: regex }).limit(10);
    res.json(products);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error during search' });
  }
};