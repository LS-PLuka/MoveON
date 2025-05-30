import db from '../config/database.js';

async function verificarUsuarioExiste(usuario_id) {
  const [rows] = await db.execute('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);
  return rows.length > 0;
}

async function verificarPostagemExiste(postagem_id) {
  const [rows] = await db.execute('SELECT id FROM postagens WHERE id = ?', [postagem_id]);
  return rows.length > 0;
}

export async function verificarCurtida(usuario_id, postagem_id) {
  const [rows] = await db.execute(
    'SELECT * FROM curtidas WHERE usuario_id = ? AND postagem_id = ?',
    [usuario_id, postagem_id]
  );
  return rows.length > 0;
}

export async function adicionarCurtida(usuario_id, postagem_id) {
  await db.execute(
    'INSERT INTO curtidas (usuario_id, postagem_id) VALUES (?, ?)',
    [usuario_id, postagem_id]
  );
}

export async function removerCurtida(usuario_id, postagem_id) {
  await db.execute(
    'DELETE FROM curtidas WHERE usuario_id = ? AND postagem_id = ?',
    [usuario_id, postagem_id]
  );
}

export async function curtirToggle(usuario_id, postagem_id) {
  const usuarioExiste = await verificarUsuarioExiste(usuario_id);
  if (!usuarioExiste) throw new Error('Usuário não encontrado');

  const postagemExiste = await verificarPostagemExiste(postagem_id);
  if (!postagemExiste) throw new Error('Postagem não encontrada');

  const jaCurtiu = await verificarCurtida(usuario_id, postagem_id);

  if (jaCurtiu) {
    await removerCurtida(usuario_id, postagem_id);
    return { mensagem: 'Curtida removida' };
  } else {
    await adicionarCurtida(usuario_id, postagem_id);
    return { mensagem: 'Postagem curtida' };
  }
}
