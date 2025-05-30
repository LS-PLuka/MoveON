import db from '../config/database.js';

async function criarPostagem(usuario_id, conteudo, imagem) {
  const sql = 'INSERT INTO postagens (usuario_id, conteudo, imagem) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [usuario_id, conteudo, imagem]);
  return result.insertId;
}

async function buscarPostagens() {
  const [rows] = await db.execute('SELECT * FROM postagens');
  return rows;
}

async function deletarPostagem(id) {
  await db.execute('DELETE FROM postagens WHERE id = ?', [id]);
}

async function buscarPostagensDeSeguidos(usuarioId) {
  const [result] = await db.execute(`
    SELECT p.id, p.conteudo, p.imagem, p.criado_em,
           u.nome AS nome_usuario
    FROM postagens p
    JOIN usuarios u ON u.id = p.usuario_id
    WHERE p.usuario_id IN (
      SELECT seguido_id FROM seguidores WHERE seguidor_id = ?
    )
    ORDER BY p.criado_em DESC
  `, [usuarioId]);

  return result.map(post => ({
    id: post.id,
    conteudo: post.conteudo,
    imagem: post.imagem,
    criado_em: post.criado_em,
    usuario: {
      nome: post.nome_usuario
    }
  }));
}

async function buscarFeed(usuarioId) {
  const query = `
    SELECT 
      p.id,
      p.conteudo,
      p.imagem,
      p.criado_em,
      u.id AS usuario_id,
      u.nome AS nome_usuario,
      COUNT(c.id) AS total_curtidas
    FROM postagens p
    JOIN usuarios u ON p.usuario_id = u.id
    LEFT JOIN curtidas c ON p.id = c.postagem_id
    WHERE p.usuario_id IN (
      SELECT seguido_id FROM seguidores WHERE seguidor_id = ?
    )
    GROUP BY p.id
    ORDER BY p.criado_em DESC
  `;

  const [rows] = await db.query(query, [usuarioId]);
  return rows.map(post => ({
    id: post.id,
    conteudo: post.conteudo,
    imagem: post.imagem,
    criado_em: post.criado_em,
    usuario: {
      id: post.usuario_id,
      nome: post.nome_usuario,
    },
    total_curtidas: post.total_curtidas
  }));  
}

export { criarPostagem, buscarPostagens, deletarPostagem, buscarPostagensDeSeguidos, buscarFeed };
