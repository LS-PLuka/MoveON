import db from '../config/database.js';

async function seguirUsuario(seguidor_id, seguido_id) {
  const sql = 'INSERT INTO seguidores (seguidor_id, seguido_id) VALUES (?, ?)';
  const [result] = await db.execute(sql, [seguidor_id, seguido_id]);
  return result.insertId;
}

async function listarSeguidores(usuario_id) {
  const [rows] = await db.execute('SELECT * FROM seguidores WHERE seguido_id = ?', [usuario_id]);
  return rows;
}

export { seguirUsuario, listarSeguidores };
