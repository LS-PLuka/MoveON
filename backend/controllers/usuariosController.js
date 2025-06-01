import {
  criarUsuario,
  autenticarUsuario,
  buscarTodosUsuarios,
  buscarUsuarioPorId,
  obterUsuarioPorNomeUsuario,
  atualizarNome,
  atualizarEmail,
  atualizarSenha,
  deletarUsuario
} from '../models/usuarios.js';

// Criar novo usuário
export async function registrarUsuario(req, res) {
  const { nome, usuario, email, senha } = req.body;

  try {
    const id = await criarUsuario(nome, usuario, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário: ' + error.message });
  }
}

// Login do usuário
export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario(email, senha);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login: ' + error.message });
  }
}

// Listar todos os usuários
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await buscarTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários: ' + error.message });
  }
}

// Buscar um usuário por ID
export async function buscarUsuario(req, res) {
  const { id } = req.params;

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário: ' + error.message });
  }
}

// Buscar um usuário por nome de usuário
export async function buscarUsuarioPorNomeUsuario(req, res) {
  const { usuario } = req.params;
  try {
    const usuarioEncontrado = await obterUsuarioPorNomeUsuario(usuario);
    if (!usuarioEncontrado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuarioEncontrado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
}

// Atualizar um usuário
export async function atualizarUsuarioController(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await buscarUsuarioPorId(id);

    if (!usuarioExistente) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (nome) await atualizarNome(id, nome);
    if (email) await atualizarEmail(id, email);
    if (senha) await atualizarSenha(id, senha);

    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário: ' + error.message });
  }
}

// Deletar usuário
export async function deletarUsuarioController(req, res) {
  const { id } = req.params;

  try {
    await deletarUsuario(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar usuário: ' + error.message });
  }
}
