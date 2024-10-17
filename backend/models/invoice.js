const pool = require('../config/db');// Import the pool from db.js

// Function to get all invoices
const getInvoices = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM invoices');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Function to create a new invoice
const createInvoice = async (req, res) => {
  const { date, customer_name, salesperson_name, notes, total_amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO invoices (date, customer_name, salesperson_name, notes, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, customer_name, salesperson_name, notes, total_amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getInvoices, createInvoice };
