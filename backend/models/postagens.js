import db from '../config/database.js';

const Postagens = {
  async criar({ usuario_id, conteudo }) {
    const [result] = await db.execute(
      'INSERT INTO postagens (usuario_id, conteudo) VALUES (?, ?)',
      [usuario_id, conteudo]
    );
    return result.insertId;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM postagens WHERE id = ?', [id]);
    return rows[0];
  },

  async buscarTodas() {
    const [rows] = await db.execute('SELECT * FROM postagens');
    return rows;
  },

  async deletar(id) {
    const [result] = await db.execute('DELETE FROM postagens WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default Postagens;
