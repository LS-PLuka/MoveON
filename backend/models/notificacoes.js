import db from '../config/database.js';

async function criarNotificacao(usuario_id, mensagem) {
  const sql = 'INSERT INTO notificacoes (usuario_id, mensagem) VALUES (?, ?)';
  const [result] = await db.execute(sql, [usuario_id, mensagem]);
  return result.insertId;
}

async function buscarNotificacoes(usuario_id) {
  const [rows] = await db.execute('SELECT * FROM notificacoes WHERE usuario_id = ?', [usuario_id]);
  return rows;
}

export { criarNotificacao, buscarNotificacoes };
