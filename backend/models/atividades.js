import db from '../config/database.js';

async function criarAtividade(nome) {
  const sql = 'INSERT INTO atividades (nome) VALUES (?)';
  const [result] = await db.execute(sql, [nome]);
  return result.insertId;
}

async function listarAtividades() {
  const sql = 'SELECT * FROM atividades';
  const [rows] = await db.execute(sql);
  return rows;
}

async function buscarAtividadePorId(id) {
  const sql = 'SELECT * FROM atividades WHERE id = ?';
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
}

export { criarAtividade, listarAtividades, buscarAtividadePorId };
