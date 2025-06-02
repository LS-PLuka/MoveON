import db from '../config/database.js';

async function criarNotificacao(usuario_id, tipo, referencia_id = null, remetente_id = null) {
  const sql = `
    INSERT INTO notificacoes (usuario_id, tipo, referencia_id, remetente_id) 
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, tipo, referencia_id, remetente_id]);
  return result.insertId;
}

async function buscarNotificacoes(usuario_id) {
  const sql = `
    SELECT n.id, n.tipo, n.referencia_id, n.criado_em, n.lida,
           u.id AS remetente_id, u.nome AS remetente_nome
    FROM notificacoes n
    LEFT JOIN usuarios u ON u.id = n.remetente_id
    WHERE n.usuario_id = ?
    ORDER BY n.criado_em DESC
  `;
  const [rows] = await db.execute(sql, [usuario_id]);

  return rows.map(n => ({
    id: n.id,
    tipo: n.tipo,
    referencia_id: n.referencia_id,
    criado_em: n.criado_em,
    lida: !!n.lida,
    remetente: {
      id: n.remetente_id,
      nome: n.remetente_nome || 'Sistema'
    }
  }));
}

export { criarNotificacao, buscarNotificacoes };
