import { curtirToggle } from '../models/curtidas.js';

export async function toggleCurtida(req, res) {
  const usuario_id = req.body.usuario_id;
  const postagem_id = req.params.postagemId;

  if (!usuario_id || !postagem_id) {
    return res.status(400).json({ erro: 'Usuário e postagem são obrigatórios' });
  }

  try {
    const resultado = await curtirToggle(usuario_id, postagem_id);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message || 'Erro ao atualizar curtida' });
  }
}
