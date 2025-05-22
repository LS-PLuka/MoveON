const Postagem = require('../models/Postagem.js');

module.exports = {
	async criar(req, res) {
		const { conteudo, usuarioId } = req.body;
		if (!conteudo || !usuarioId) {
			return res.status(400).json({ error: 'Conteúdo e usuarioId obrigatórios.' });
		}
		try {
			await Postagem.create(conteudo, usuarioId);
			res.status(201).json({ mensagem: 'Postagem criada!' });
		} catch {
			res.status(500).json({ error: 'Erro ao criar postagem.' });
		}
	},
	async listar(req, res) {
		try {
			const posts = await Postagem.findAll();
			res.json(posts);
		} catch {
			res.status(500).json({ error: 'Erro ao listar postagens.' });
		}
	}
};