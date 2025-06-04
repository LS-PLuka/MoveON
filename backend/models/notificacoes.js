import db from '../config/database.js';

/**
 * @param {number} usuario_id
 * @param {string} tipo
 * @param {number|null} referencia_id
 * @param {number|null} remetente_id
 * @returns {Promise<number>}
 */
async function criarNotificacao(usuario_id, tipo, referencia_id = null, remetente_id = null) {
  const [remetente] = await db.execute('SELECT nome FROM usuarios WHERE id = ?', [remetente_id]);
  const nomeRemetente = remetente[0]?.nome || 'Um usuário';

  let mensagem = '';

  switch (tipo) {
    case 'curtida':
      mensagem = `${nomeRemetente} curtiu sua postagem.`;
      break;
    case 'comentario':
      mensagem = `${nomeRemetente} comentou em sua postagem.`;
      break;
    case 'seguindo':
      mensagem = `${nomeRemetente} começou a te seguir.`;
      break;
    case 'mensagem':
      mensagem = `${nomeRemetente} enviou uma mensagem direta.`;
      break;
    default:
      mensagem = `${nomeRemetente} fez uma ação.`;
  }

  const sql = `
    INSERT INTO notificacoes (usuario_id, tipo, referencia_id, remetente_id, mensagem) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, tipo, referencia_id, remetente_id, mensagem]);
  return result.insertId;
}

/**
 * @param {number} usuario_id
 * @returns {Promise<Array>}
 */
async function buscarNotificacoes(usuario_id) {
  const sql = `
    SELECT n.id, n.tipo, n.referencia_id, n.mensagem, n.criado_em, u.nome AS remetente_nome
    FROM notificacoes n
    LEFT JOIN usuarios u ON n.remetente_id = u.id
    WHERE n.usuario_id = ?
    ORDER BY n.criado_em DESC
  `;
  const [rows] = await db.execute(sql, [usuario_id]);
  return rows;
}

export {
  criarNotificacao,
  buscarNotificacoes,
};
