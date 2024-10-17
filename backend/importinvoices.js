// importinvoices.js
import pool from './db.js';

async function importInvoiceData(invoice) {
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const invoiceResult = await client.query(
        `INSERT INTO invoices (date, customer_name, salesperson_name, notes, total_amount)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [invoice.date, invoice.customer_name, invoice.salesperson_name, invoice.notes, invoice.total_amount]
      );

      const invoiceId = invoiceResult.rows[0].id;

      for (let product of invoice.products) {
        await client.query(
          `INSERT INTO invoice_products (invoice_id, product_id, quantity)
           VALUES ($1, $2, $3)`,
          [invoiceId, product.id, product.quantity]
        );
      }

      await client.query('COMMIT');
      console.log('Invoice data successfully inserted!');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error inserting invoice data:', err);
  }
}

// Example usage with sample data
const invoice = {
  date: '2024-10-15',
  customer_name: 'John Doe',
  salesperson_name: 'Jane Smith',
  notes: 'Sample invoice',
  total_amount: 500.50,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 }
  ]
};

importInvoiceData(invoice);
