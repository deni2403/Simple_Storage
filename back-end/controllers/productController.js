import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ['uuid', 'productName', 'qty', 'price'],
      include: [
        {
          attributes: ['name', 'email'],
          model: User,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    const response = await Product.findOne({
      attributes: ['uuid', 'productName', 'qty', 'price'],
      where: {
        id: product.id,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createProduct = async (req, res) => {
  const { productName, qty, price } = req.body;
  try {
    await Product.create({
      productName,
      qty,
      price,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'New product created' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    const { productName, qty, price } = req.body;
    await Product.update(
      {
        productName,
        qty,
        price,
      },
      {
        where: {
          id: product.id,
        },
      },
    );
    return res.status(200).json({ msg: 'Product updated' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    await Product.destroy({
      where: {
        id: product.id,
      },
    });
    return res.status(200).json({ msg: 'Product Deleted' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
