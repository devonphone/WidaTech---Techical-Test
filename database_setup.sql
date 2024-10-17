CREATE DATABASE wida_tech;

-- Connect to the database
\c wida_tech

-- Create tables
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_picture VARCHAR(255),
    stock INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE invoices (
    invoice_no SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    salesperson_name VARCHAR(255) NOT NULL,
    notes TEXT,
    total_amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_no INT REFERENCES invoices(invoice_no) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL
);