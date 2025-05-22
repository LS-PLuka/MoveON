import db from '../config/database.js';

const Comentarios = {
  async criar({ usuario_id, postagem_id, conteudo }) {
    const [result] = await db.execute(
      'INSERT INTO comentarios (usuario_id, postagem_id, conteudo) VALUES (?, ?, ?)',
      [usuario_id, postagem_id, conteudo]
    );
    return result.insertId;
  },

  async buscarPorPostagem(postagem_id) {
    const [rows] = await db.execute(
      'SELECT * FROM comentarios WHERE postagem_id = ?',
      [postagem_id]
    );
    return rows;
  },

  async deletar(id) {
    const [result] = await db.execute('DELETE FROM comentarios WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default Comentarios;
