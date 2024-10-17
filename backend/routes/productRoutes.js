const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../models/product');

// GET all products
router.get('/', getProducts);

// POST a new product
router.post('/', createProduct);

module.exports = router;
