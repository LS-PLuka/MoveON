import db from '../config/database.js';

async function comentarPostagem(usuario_id, postagem_id, texto) {
  const sql = 'INSERT INTO comentarios (usuario_id, postagem_id, texto) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [usuario_id, postagem_id, texto]);
  return result.insertId;
}

async function listarComentariosPorPostagem(postagem_id) {
  const sql = 'SELECT * FROM comentarios WHERE postagem_id = ? ORDER BY created_at DESC';
  const [rows] = await db.execute(sql, [postagem_id]);
  return rows;
}

export { comentarPostagem, listarComentariosPorPostagem };
