const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcrypt');

module.exports = {
	async cadastrar(req, res) {
		const { nome, usuario, senha } = req.body;
		if (!nome || !usuario || !senha) {
			return res.status(400).json({ error: 'Preencha todos os campos.' });
		}

		try {
			const hash = await bcrypt.hash(senha, 10);
			await Usuario.create(nome, usuario, hash);
			res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
		} catch (error) {
			if (error.code === 'ER_DUP_ENTRY') {
				res.status(400).json({ error: 'Nome de usuário já existe.' });
			} else {
				res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
			}
		}
	},

	async login(req, res) {
		const { usuario, senha } = req.body;
		if (!usuario || !senha) {
			return res.status(400).json({ error: 'Preencha todos os campos.' });
		}
		try {
			const usuarioDB = await Usuario.findByUsuario(usuario);
			if (!usuarioDB) {
				return res.status(400).json({ error: 'Usuário não encontrado.' });
			}
			const match = await bcrypt.compare(senha, usuarioDB.senha);
			if (!match) {
				return res.status(401).json({ error: 'Senha incorreta.' });
			}
			res.json({ mensagem: 'Login realizado com sucesso!', usuario: usuarioDB });
		} catch {
			res.status(500).json({ error: 'Erro ao fazer login.' });
		}
	}
};