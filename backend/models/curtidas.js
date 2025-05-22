import db from '../config/database.js';

const Curtidas = {
  async curtir(usuario_id, postagem_id) {
    const [result] = await db.execute(
      'INSERT IGNORE INTO curtidas (usuario_id, postagem_id) VALUES (?, ?)',
      [usuario_id, postagem_id]
    );
    return result.insertId;
  },

  async descurtir(usuario_id, postagem_id) {
    const [result] = await db.execute(
      'DELETE FROM curtidas WHERE usuario_id = ? AND postagem_id = ?',
      [usuario_id, postagem_id]
    );
    return result.affectedRows;
  },

  async contarCurtidas(postagem_id) {
    const [rows] = await db.execute(
      'SELECT COUNT(*) AS total FROM curtidas WHERE postagem_id = ?',
      [postagem_id]
    );
    return rows[0].total;
  }
};

export default Curtidas;
