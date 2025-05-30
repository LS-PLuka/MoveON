import { comentarPostagem, listarComentariosPorPostagem } from '../models/comentarios.js';

export async function novoComentario(req, res) {
  const { usuario_id, conteudo } = req.body;
  const { postagem_id } = req.params;

  if (!usuario_id || !postagem_id || !conteudo) {
    return res.status(400).json({ erro: 'usuario_id, postagem_id e conteudo são obrigatórios' });
  }

  try {
    const insertId = await comentarPostagem(usuario_id, postagem_id, conteudo);

    const comentarios = await listarComentariosPorPostagem(postagem_id);
    const comentarioInserido = comentarios.find(c => c.id === insertId);

    if (!comentarioInserido) {
      // Caso não encontre o comentário (pode acontecer), retorna só a confirmação
      return res.status(201).json({ mensagem: 'Comentário adicionado!', id: insertId });
    }

    res.status(201).json(comentarioInserido);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao comentar: ' + error.message });
  }
}

export async function obterComentarios(req, res) {
  const { postagem_id } = req.params;

  try {
    const comentarios = await listarComentariosPorPostagem(postagem_id);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao obter comentários: ' + error.message });
  }
}
