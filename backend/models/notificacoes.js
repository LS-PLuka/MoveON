import db from '../config/database.js';

const Notificacoes = {
  async criar({ usuario_id, tipo, referencia_id, referencia_tipo }) {
    const [result] = await db.execute(
      'INSERT INTO notificacoes (usuario_id, tipo, referencia_id, referencia_tipo) VALUES (?, ?, ?, ?)',
      [usuario_id, tipo, referencia_id, referencia_tipo]
    );
    return result.insertId;
  },

  async listarPorUsuario(usuario_id) {
    const [rows] = await db.execute(
      'SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criado_em DESC',
      [usuario_id]
    );
    return rows;
  },

  async marcarComoLida(id) {
    const [result] = await db.execute(
      'UPDATE notificacoes SET lida = TRUE WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
};

export default Notificacoes;
