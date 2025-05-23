import db from '../config/database.js';

async function criarPostagem(usuario_id, conteudo) {
  const sql = 'INSERT INTO postagens (usuario_id, conteudo) VALUES (?, ?)';
  const [result] = await db.execute(sql, [usuario_id, conteudo]);
  return result.insertId;
}

async function buscarPostagens() {
  const [rows] = await db.execute('SELECT * FROM postagens');
  return rows;
}

export { criarPostagem, buscarPostagens };
