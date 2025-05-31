import {
  adicionarTagAtividade,
  removerTagAtividade,
  listarTagsPorUsuario
} from '../models/usuario_atividades.js';

// Adicionar tag ao perfil do usuário
export async function adicionarTag(req, res) {
  const { usuario_id, atividade_id } = req.body;

  if (!usuario_id || !atividade_id) {
    return res.status(400).json({ erro: 'usuario_id e atividade_id são obrigatórios' });
  }

  try {
    const affected = await adicionarTagAtividade(usuario_id, atividade_id);
    if (affected === 0) {
      return res.status(409).json({ mensagem: 'Tag já adicionada para esse usuário' });
    }
    res.status(201).json({ mensagem: 'Tag adicionada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar tag: ' + error.message });
  }
}

// Remover tag do perfil do usuário
export async function removerTag(req, res) {
  const { usuario_id, atividade_id } = req.body;

  if (!usuario_id || !atividade_id) {
    return res.status(400).json({ erro: 'usuario_id e atividade_id são obrigatórios' });
  }

  try {
    const affected = await removerTagAtividade(usuario_id, atividade_id);
    if (affected === 0) {
      return res.status(404).json({ mensagem: 'Tag não encontrada para esse usuário' });
    }
    res.status(200).json({ mensagem: 'Tag removida com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover tag: ' + error.message });
  }
}

// Listar tags do usuário
export async function listarTags(req, res) {
  const { usuario_id } = req.params;

  if (!usuario_id) {
    return res.status(400).json({ erro: 'usuario_id é obrigatório' });
  }

  try {
    const tags = await listarTagsPorUsuario(usuario_id);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar tags: ' + error.message });
  }
}
