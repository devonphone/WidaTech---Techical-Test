
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wida_tech',
  password: 'elephant',
  port: 5432,
});

module.exports = pool;