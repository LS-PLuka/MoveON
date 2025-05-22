import db from '../config/database.js';

const Usuarios = {
  async criar({ nome, usuario, email, senha, bio }) {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, usuario, email, senha, bio) VALUES (?, ?, ?, ?, ?)',
      [nome, usuario, email, senha, bio]
    );
    return result.insertId;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  async buscarTodos() {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
  },

  async atualizar(id, { nome, usuario, email, bio }) {
    const [result] = await db.execute(
      'UPDATE usuarios SET nome = ?, usuario = ?, email = ?, bio = ? WHERE id = ?',
      [nome, usuario, email, bio, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default Usuarios;
