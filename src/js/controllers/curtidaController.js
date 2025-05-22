const Curtida = require('../models/Curtida.js');

module.exports = {
	async curtir(req, res) {
		const { usuarioId, postagemId } = req.body;
		if (!usuarioId || !postagemId) {
			return res.status(400).json({ error: 'Campos obrigatórios.' });
		}
		try {
			await Curtida.like(usuarioId, postagemId);
			res.status(201).json({ mensagem: 'Curtida registrada!' });
		} catch {
			res.status(500).json({ error: 'Erro ao curtir.' });
		}
	},
	async descurtir(req, res) {
		const { usuarioId, postagemId } = req.body;
		try {
			await Curtida.unlike(usuarioId, postagemId);
			res.json({ mensagem: 'Curtida removida!' });
		} catch {
			res.status(500).json({ error: 'Erro ao descurtir.' });
		}
	},
	async contar(req, res) {
		const { postagemId } = req.params;
		try {
			const total = await Curtida.count(postagemId);
			res.json({ postagemId, totalCurtidas: total });
		} catch {
			res.status(500).json({ error: 'Erro ao contar curtidas.' });
		}
	}
};