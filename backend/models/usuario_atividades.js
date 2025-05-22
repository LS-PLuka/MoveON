import db from '../config/database.js';

const UsuarioAtividades = {
  async adicionar(usuario_id, atividade_id) {
    const [result] = await db.execute(
      'INSERT IGNORE INTO usuario_atividades (usuario_id, atividade_id) VALUES (?, ?)',
      [usuario_id, atividade_id]
    );
    return result.insertId;
  },

  async remover(usuario_id, atividade_id) {
    const [result] = await db.execute(
      'DELETE FROM usuario_atividades WHERE usuario_id = ? AND atividade_id = ?',
      [usuario_id, atividade_id]
    );
    return result.affectedRows;
  },

  async listarPorUsuario(usuario_id) {
    const [rows] = await db.execute(
      `SELECT a.* FROM atividades a
       JOIN usuario_atividades ua ON ua.atividade_id = a.id
       WHERE ua.usuario_id = ?`,
      [usuario_id]
    );
    return rows;
  }
};

export default UsuarioAtividades;
