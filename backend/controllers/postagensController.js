import {
  criarPostagem,
  deletarPostagem,
  buscarPostagensDeSeguidos,
  buscarFeed,
  buscarPostagensDoUsuario,
  atualizarTextoPostagem
} from '../models/postagens.js';

export async function novaPostagem(req, res) {
  const { usuario_id, conteudo } = req.body;
  const imagem = req.file ? req.file.filename : null;

  try {
    const id = await criarPostagem(usuario_id, conteudo, imagem);
    res.status(201).json({ mensagem: 'Postagem criada com sucesso!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar postagem: ' + error.message });
  }
}

export async function excluirPostagem(req, res) {
  const { id } = req.params;

  try {
    await deletarPostagem(id);
    res.json({ mensagem: 'Postagem deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar postagem: ' + error.message });
  }
}

export async function buscarFeedDoUsuario(req, res) {
  const { usuarioId } = req.params;
  try {
    const postagens = await buscarPostagensDeSeguidos(usuarioId);
    res.json(postagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar feed do usuário' });
  }
}

export async function buscarFeedComCurtidas(req, res) {
  const { usuarioId } = req.params;

  try {
    const feed = await buscarFeed(usuarioId);
    res.json(feed);
  } catch (erro) {
    console.error('Erro ao buscar feed:', erro);
    res.status(500).json({ erro: 'Erro ao buscar feed' });
  }
}

export async function buscarPostagensUsuario(req, res) {
  const { usuarioId } = req.params;
  try {
    const postagens = await buscarPostagensDoUsuario(usuarioId);
    res.json(postagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar postagens do usuário' });
  }
}

export async function editarPostagem(req, res) {
  const { id } = req.params;
  const { conteudo } = req.body;

  if (!conteudo) {
    return res.status(400).json({ erro: 'O campo "conteudo" é obrigatório.' });
  }

  try {
    await atualizarTextoPostagem(id, conteudo);
    res.json({ mensagem: 'Postagem atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar postagem: ' + error.message });
  }
}
