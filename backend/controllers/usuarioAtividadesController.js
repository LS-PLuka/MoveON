import { adicionarAtividadeUsuario } from '../models/usuario_atividades.js';

export async function novaAtividade(req, res) {
  const { usuario_id, atividade_id } = req.body;

  try {
    await adicionarAtividadeUsuario(usuario_id, atividade_id);
    res.status(201).json({ mensagem: 'Atividade associada ao usuário!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar atividade: ' + error.message });
  }
}
