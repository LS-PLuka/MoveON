import { criarUsuario, autenticarUsuario } from '../models/usuarios.js';

export async function registrarUsuario(req, res) {
  const { nome, usuario, email, senha} = req.body;

  try {
    const id = await criarUsuario(nome, usuario, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário: ' + error.message });
  }
}

export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario(email, senha);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao fazer login: ' + error.message });
  }
}
