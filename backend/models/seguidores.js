import db from '../config/database.js';

const Seguidores = {
  async seguir(seguidor_id, seguido_id) {
    const [result] = await db.execute(
      'INSERT IGNORE INTO seguidores (seguidor_id, seguido_id) VALUES (?, ?)',
      [seguidor_id, seguido_id]
    );
    return result.insertId;
  },

  async deixarDeSeguir(seguidor_id, seguido_id) {
    const [result] = await db.execute(
      'DELETE FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?',
      [seguidor_id, seguido_id]
    );
    return result.affectedRows;
  },

  async listarSeguidores(usuario_id) {
    const [rows] = await db.execute(
      'SELECT * FROM seguidores WHERE seguido_id = ?',
      [usuario_id]
    );
    return rows;
  },

  async listarSeguindo(usuario_id) {
    const [rows] = await db.execute(
      'SELECT * FROM seguidores WHERE seguidor_id = ?',
      [usuario_id]
    );
    return rows;
  }
};

export default Seguidores;
