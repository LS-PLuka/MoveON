import { criarNotificacao, buscarNotificacoes, marcarComoLida } from '../models/notificacoes.js';

export async function novaNotificacao(req, res) {
  const { usuario_id, tipo, referencia_id } = req.body;

  try {
    if (!usuario_id || !tipo) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    const id = await criarNotificacao(usuario_id, tipo, referencia_id);
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

export async function lerNotificacao(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ erro: 'ID da notificação é obrigatório.' });
    }

    const resultado = await marcarComoLida(id);
    if (resultado === 0) {
      return res.status(404).json({ erro: 'Notificação não encontrada.' });
    }

    res.json({ mensagem: 'Notificação marcada como lida.' });
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    res.status(500).json({ erro: 'Erro ao marcar notificação como lida: ' + error.message });
  }
}
