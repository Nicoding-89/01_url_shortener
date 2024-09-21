import 'dotenv/config';
import pg from 'pg'
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true
});

const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to the Database: ', err);
  };
};

export { pool, 
  checkDatabaseConnection 
};