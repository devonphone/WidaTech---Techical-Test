const pool = require('../config/db');

// Function to get all products
const getProducts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM products');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  const { product_name, product_picture, stock, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (product_name, product_picture, stock, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_name, product_picture, stock, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getProducts, createProduct };
