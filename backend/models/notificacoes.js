import db from '../config/database.js';

async function criarNotificacao(usuario_id, tipo, referencia_id, referencia_tipo) {
  const sql = `
    INSERT INTO notificacoes (usuario_id, tipo, referencia_id, referencia_tipo) 
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [usuario_id, tipo, referencia_id, referencia_tipo]);
  return result.insertId;
}

async function buscarNotificacoes(usuario_id) {
  const [rows] = await db.execute('SELECT * FROM notificacoes WHERE usuario_id = ?', [usuario_id]);
  return rows;
}

export { criarNotificacao, buscarNotificacoes };
