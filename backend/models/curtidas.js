import db from '../config/database.js';

async function verificarUsuarioExiste(usuario_id) {
  const [rows] = await db.execute('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);
  return rows.length > 0;
}

async function verificarPostagemExiste(postagem_id) {
  const [rows] = await db.execute('SELECT id FROM postagens WHERE id = ?', [postagem_id]);
  return rows.length > 0;
}

export async function curtirPostagem(usuario_id, postagem_id) {
  const usuarioExiste = await verificarUsuarioExiste(usuario_id);
  if (!usuarioExiste) throw new Error('Usuário não encontrado');

  const postagemExiste = await verificarPostagemExiste(postagem_id);
  if (!postagemExiste) throw new Error('Postagem não encontrada');

  const sql = 'INSERT INTO curtidas (usuario_id, postagem_id) VALUES (?, ?)';
  const [result] = await db.execute(sql, [usuario_id, postagem_id]);
  return result.insertId;
}

export async function buscarCurtidas() {
  const [rows] = await db.execute('SELECT * FROM curtidas');
  return rows;
}
