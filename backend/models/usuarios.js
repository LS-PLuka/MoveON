// backend/models/usuarios.js
import db from '../config/database.js';

// Criar um novo usuário
export async function criarUsuario(nome, usuario, email, senha) {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)',
    [nome, usuario, email, senha]
  );
  return result.insertId;
}

export async function autenticarUsuario(email, senha) {
  const [rows] = await db.execute(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha]
  );
  return rows[0];
}

// Buscar todos os usuários
export async function buscarTodosUsuarios() {
  const [rows] = await db.execute('SELECT * FROM usuarios');
  return rows;
}

// Buscar um usuário por ID
export async function buscarUsuarioPorId(id) {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

// Atualizar um usuário
export async function atualizarUsuario(id, nome, email, senha) {
  await db.execute(
    'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
    [nome, email, senha, id]
  );
}

// Deletar um usuário
export async function deletarUsuario(id) {
  await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
}
