import db from '../config/database.js';

const Mensagens = {
  async enviar({ remetente_id, destinatario_id, conteudo }) {
    const [result] = await db.execute(
      'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo) VALUES (?, ?, ?)',
      [remetente_id, destinatario_id, conteudo]
    );
    return result.insertId;
  },

  async listarEntre(remetente_id, destinatario_id) {
    const [rows] = await db.execute(
      `SELECT * FROM mensagens
       WHERE (remetente_id = ? AND destinatario_id = ?)
       OR (remetente_id = ? AND destinatario_id = ?)
       ORDER BY criado_em ASC`,
      [remetente_id, destinatario_id, destinatario_id, remetente_id]
    );
    return rows;
  },

  async marcarComoLida(id) {
    const [result] = await db.execute(
      'UPDATE mensagens SET lida = TRUE WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
};

export default Mensagens;
