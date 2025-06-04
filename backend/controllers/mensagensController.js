// controllers/mensagensController.js
import {
  enviarMensagem,
  buscarMensagensEntreUsuarios,
  editarMensagem,
  excluirMensagem,
} from '../models/mensagens.js';

export async function novaMensagem(req, res) {
  const { remetente_id, destinatario_id, conteudo } = req.body;
  try {
    const id = await enviarMensagem(remetente_id, destinatario_id, conteudo);
    res.status(201).json({ mensagem: 'Mensagem enviada!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar mensagem: ' + error.message });
  }
}

export async function listarMensagens(req, res) {
  const { usuario1, usuario2 } = req.query;
  if (!usuario1 || !usuario2) {
    return res.status(400).json({ erro: 'Parâmetros usuario1 e usuario2 são obrigatórios' });
  }
  try {
    const mensagens = await buscarMensagensEntreUsuarios(usuario1, usuario2);
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar mensagens: ' + error.message });
  }
}

export async function atualizarMensagem(req, res) {
  const { id } = req.params;
  const { conteudo } = req.body;

  if (!conteudo || conteudo.trim() === '') {
    return res.status(400).json({ erro: 'O conteúdo da mensagem não pode ser vazio.' });
  }

  try {
    const sucesso = await editarMensagem(id, conteudo);
    if (sucesso) {
      res.json({ mensagem: 'Mensagem atualizada com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar mensagem: ' + error.message });
  }
}

export async function deletarMensagem(req, res) {
  const { id } = req.params;
  try {
    const sucesso = await excluirMensagem(id);
    if (sucesso) {
      res.json({ mensagem: 'Mensagem excluída com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir mensagem: ' + error.message });
  }
}
