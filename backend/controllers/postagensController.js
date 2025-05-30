import {
  criarPostagem,
  deletarPostagem,
  buscarPostagensDeSeguidos,
  buscarFeed
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
