import { criarNotificacao, buscarNotificacoes } from '../models/notificacoes.js';

export async function novaNotificacao(req, res) {
  const { usuario_id, tipo, referencia_id, referencia_tipo } = req.body;

  try {
    const id = await criarNotificacao(usuario_id, tipo, referencia_id, referencia_tipo);
    res.status(201).json({ mensagem: 'Notificação criada!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar notificação: ' + error.message });
  }
}

export async function listarNotificacoes(req, res) {
  const { usuario_id } = req.params;

  try {
    const notificacoes = await buscarNotificacoes(usuario_id);
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar notificações: ' + error.message });
  }
}
