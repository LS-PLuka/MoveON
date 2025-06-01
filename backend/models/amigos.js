import db from '../config/database.js';

async function buscarAmigosDoUsuario(usuarioId) {
  const sql = `
    SELECT u.id, u.nome, u.email
    FROM usuarios u
    JOIN seguidores s1 ON u.id = s1.seguidor_id AND s1.seguido_id = ?
    JOIN seguidores s2 ON u.id = s2.seguido_id AND s2.seguidor_id = ?
  `;
  const [rows] = await db.execute(sql, [usuarioId, usuarioId]);
  return rows;
}

export { buscarAmigosDoUsuario };
