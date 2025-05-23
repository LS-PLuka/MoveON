import { comentarPostagem } from '../models/comentarios.js';

export async function novoComentario(req, res) {
  const { usuario_id, postagem_id, conteudo } = req.body;

  try {
    const id = await comentarPostagem(usuario_id, postagem_id, conteudo);
    res.status(201).json({ mensagem: 'Comentário adicionado!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao comentar: ' + error.message });
  }
}
