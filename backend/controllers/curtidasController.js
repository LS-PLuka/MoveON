import { curtirPostagem } from '../models/curtidas.js';

export async function novaCurtida(req, res) {
  const { usuario_id, postagem_id } = req.body;

  try {
    const id = await curtirPostagem(usuario_id, postagem_id);
    res.status(201).json({ mensagem: 'Postagem curtida!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao curtir postagem: ' + error.message });
  }
}
