import { criarNotificacao } from '../models/notificacoes.js';

export async function novaNotificacao(req, res) {
  const { usuario_id, tipo, referencia_id, referencia_tipo } = req.body;

  try {
    const id = await criarNotificacao(usuario_id, tipo, referencia_id, referencia_tipo);
    res.status(201).json({ mensagem: 'Notificação criada!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar notificação: ' + error.message });
  }
}
