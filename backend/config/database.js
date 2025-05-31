import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pedro2211',
  database: 'moveon',
  waitForConnections: true,
  connectionLimit: 10
});

export default db;
