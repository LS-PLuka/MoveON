import db from '../config/database.js';

async function curtirPostagem(usuario_id, postagem_id) {
  const sql = 'INSERT INTO curtidas (usuario_id, postagem_id) VALUES (?, ?)';
  const [result] = await db.execute(sql, [usuario_id, postagem_id]);
  return result.insertId;
}

async function buscarCurtidas() {
  const [rows] = await db.execute('SELECT * FROM curtidas');
  return rows;
}

export { curtirPostagem, buscarCurtidas };
