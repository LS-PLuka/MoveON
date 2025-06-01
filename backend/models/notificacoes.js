import db from '../config/database.js';

async function criarNotificacao(usuario_id, tipo, referencia_id = null) {
  const sql = `
    INSERT INTO notificacoes (usuario_id, tipo, referencia_id) 
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, tipo, referencia_id]);
  return result.insertId;
}

async function buscarNotificacoes(usuario_id) {
  const sql = `
    SELECT n.id, n.tipo, n.referencia_id, n.criado_em, n.lida,
           u.nome AS remetente_nome
    FROM notificacoes n
    JOIN usuarios u ON u.id = n.usuario_id
    WHERE n.usuario_id = ?
    ORDER BY n.criado_em DESC
  `;
  const [rows] = await db.execute(sql, [usuario_id]);
  return rows;
}

async function marcarComoLida(notificacao_id) {
  const sql = `
    UPDATE notificacoes SET lida = TRUE WHERE id = ?
  `;
  const [result] = await db.execute(sql, [notificacao_id]);
  return result.affectedRows;
}

export { criarNotificacao, buscarNotificacoes, marcarComoLida };
