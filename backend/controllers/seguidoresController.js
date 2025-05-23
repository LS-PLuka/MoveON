import { seguirUsuario } from '../models/seguidores.js';

export async function novoSeguidor(req, res) {
  const { seguidor_id, seguido_id } = req.body;

  try {
    const id = await seguirUsuario(seguidor_id, seguido_id);
    res.status(201).json({ mensagem: 'Agora está seguindo!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao seguir usuário: ' + error.message });
  }
}
