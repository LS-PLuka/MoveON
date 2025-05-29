import { comentarPostagem } from '../models/comentarios.js';

export async function novoComentario(req, res) {
  const { usuario_id, postagem_id, conteudo } = req.body;

  if (!usuario_id || !postagem_id || !conteudo) {
    return res.status(400).json({ erro: 'usuario_id, postagem_id e conteudo são obrigatórios' });
  }

  try {
    const id = await comentarPostagem(usuario_id, postagem_id, conteudo);
    res.status(201).json({ mensagem: 'Comentário adicionado!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao comentar: ' + error.message });
  }
}
