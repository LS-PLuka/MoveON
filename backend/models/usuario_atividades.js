import db from '../config/database.js';

async function adicionarAtividadeUsuario(usuario_id, atividade_id, duracao, data_atividade) {
  const sql = `
    INSERT INTO usuario_atividades (usuario_id, atividade_id, duracao, data_atividade)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, atividade_id, duracao, data_atividade]);
  return result.insertId;
}

async function listarAtividadesPorUsuario(usuario_id) {
  const sql = `
    SELECT ua.*, a.nome as atividade_nome
    FROM usuario_atividades ua
    JOIN atividades a ON ua.atividade_id = a.id
    WHERE ua.usuario_id = ?
    ORDER BY ua.data_atividade DESC
  `;
  const [rows] = await db.execute(sql, [usuario_id]);
  return rows;
}

export { adicionarAtividadeUsuario, listarAtividadesPorUsuario };
