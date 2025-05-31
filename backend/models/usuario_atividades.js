import db from '../config/database.js';

// Adicionar uma tag (atividade) para o usuário
export async function adicionarTagAtividade(usuario_id, atividade_id) {
  const sql = `
    INSERT IGNORE INTO usuario_atividades (usuario_id, atividade_id)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, atividade_id]);
  return result.affectedRows;
}

// Remover uma tag (atividade) do usuário
export async function removerTagAtividade(usuario_id, atividade_id) {
  const sql = `
    DELETE FROM usuario_atividades
    WHERE usuario_id = ? AND atividade_id = ?
  `;
  const [result] = await db.execute(sql, [usuario_id, atividade_id]);
  return result.affectedRows;
}

// Listar todas as atividades (tags) do usuário
export async function listarTagsPorUsuario(usuario_id) {
  const sql = `
    SELECT a.id, a.nome
    FROM atividades a
    JOIN usuario_atividades ua ON a.id = ua.atividade_id
    WHERE ua.usuario_id = ?
  `;
  const [rows] = await db.execute(sql, [usuario_id]);
  return rows;
}
