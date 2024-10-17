const express = require('express');
const router = express.Router();
const { getInvoices, createInvoice } = require('../models/invoice');

// GET all invoices
router.get('/', getInvoices);

// POST a new invoice
router.post('/', createInvoice);

module.exports = router;
