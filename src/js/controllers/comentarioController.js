const Comentario = require('../models/Comentario.js');

module.exports = {
	async criar(req, res) {
		const { conteudo, postagemId, usuarioId } = req.body;
		if (!conteudo || !postagemId || !usuarioId) {
			return res.status(400).json({ error: 'Campos obrigatórios.' });
		}
		try {
			await Comentario.create(conteudo, postagemId, usuarioId);
			res.status(201).json({ mensagem: 'Comentário criado!' });
		} catch {
			res.status(500).json({ error: 'Erro ao comentar.' });
		}
	},
	async listarPorPostagem(req, res) {
		const { postagemId } = req.params;
		try {
			const comentarios = await Comentario.findByPostagem(postagemId);
			res.json(comentarios);
		} catch {
			res.status(500).json({ error: 'Erro ao listar comentários.' });
		}
	}
};