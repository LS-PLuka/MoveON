import {
  criarNotificacao,
  buscarNotificacoes,
} from '../models/notificacoes.js';

export async function novaNotificacao(req, res) {
  const { usuario_id, tipo, referencia_id, remetente_id } = req.body;

  try {
    if (!usuario_id || !tipo || !remetente_id) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    const id = await criarNotificacao(usuario_id, tipo, referencia_id, remetente_id);
    res.status(201).json({ mensagem: 'Notificação criada!', id });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({ erro: 'Erro ao criar notificação: ' + error.message });
  }
}

export async function listarNotificacoes(req, res) {
  const { usuario_id } = req.params;

  try {
    if (!usuario_id) {
      return res.status(400).json({ erro: 'ID do usuário é obrigatório.' });
    }

    const notificacoes = await buscarNotificacoes(usuario_id);
    res.json(notificacoes);
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ erro: 'Erro ao buscar notificações: ' + error.message });
  }
}
