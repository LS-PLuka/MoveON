import { criarUsuario } from '../models/usuarios.js';

export async function registrarUsuario(req, res) {
  console.log(req.body);
  
  const { nome, usuario, email, senha, bio } = req.body;

  try {
    const id = await criarUsuario(nome, usuario, email, senha, bio);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário: ' + error.message });
  }
}
