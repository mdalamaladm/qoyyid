const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: +process.env.PGSQL_PORT,
  database: process.env.PGSQL_DATABASE,
});


module.exports = pool;
