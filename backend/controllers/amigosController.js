import { buscarAmigosDoUsuario } from '../models/amigos.js';

export async function listarAmigos(req, res) {
  const usuarioId = req.params.id;

  try {
    const amigos = await buscarAmigosDoUsuario(usuarioId);
    res.json(amigos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar amigos: ' + error.message });
  }
}
