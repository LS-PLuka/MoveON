import db from '../config/database.js';

export async function comentarPostagem(usuario_id, postagem_id, conteudo) {
  const sql = 'INSERT INTO comentarios (usuario_id, postagem_id, conteudo) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [usuario_id, postagem_id, conteudo]);
  return result.insertId;
}

export async function listarComentariosPorPostagem(postagem_id) {
  const sql = `
    SELECT c.id, c.conteudo, c.criado_em, u.nome AS nome_usuario
    FROM comentarios c
    JOIN usuarios u ON c.usuario_id = u.id
    WHERE c.postagem_id = ?
    ORDER BY c.criado_em DESC
  `;
  const [rows] = await db.execute(sql, [postagem_id]);
  return rows;
}
