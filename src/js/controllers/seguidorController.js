const Seguidor = require('../models/Seguidor.js');

module.exports = {
	async seguir(req, res) {
		const { seguidorId, seguidoId } = req.body;
		if (!seguidorId || !seguidoId) {
			return res.status(400).json({ error: 'Campos obrigatórios.' });
		}
		try {
			await Seguidor.follow(seguidorId, seguidoId);
			res.status(201).json({ mensagem: 'Agora você segue esse usuário!' });
		} catch {
			res.status(500).json({ error: 'Erro ao seguir.' });
		}
	},
	async deixarDeSeguir(req, res) {
		const { seguidorId, seguidoId } = req.body;
		try {
			await Seguidor.unfollow(seguidorId, seguidoId);
			res.json({ mensagem: 'Você deixou de seguir.' });
		} catch {
			res.status(500).json({ error: 'Erro ao deixar de seguir.' });
		}
	},
	async seguidores(req, res) {
		const { usuarioId } = req.params;
		try {
			const seguidores = await Seguidor.seguidores(usuarioId);
			res.json(seguidores);
		} catch {
			res.status(500).json({ error: 'Erro ao listar seguidores.' });
		}
	},
	async seguindo(req, res) {
		const { usuarioId } = req.params;
		try {
			const seguindo = await Seguidor.seguindo(usuarioId);
			res.json(seguindo);
		} catch {
			res.status(500).json({ error: 'Erro ao listar seguindo.' });
		}
	}
    
};