import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aluno',
  database: 'moveon',
  waitForConnections: true,
  connectionLimit: 10
});

export default db;
