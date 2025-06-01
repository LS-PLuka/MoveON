import {
  seguirUsuario,
  deixarDeSeguir,
  verificarSeguimento
} from '../models/seguidores.js';

export async function alternarSeguidor(req, res) {
  const { seguidor_id, seguido_id } = req.body;

  try {
    const jaSegue = await verificarSeguimento(seguidor_id, seguido_id);

    if (jaSegue) {
      await deixarDeSeguir(seguidor_id, seguido_id);
      res.json({ mensagem: 'Deixou de seguir.' });
    } else {
      await seguirUsuario(seguidor_id, seguido_id);
      res.json({ mensagem: 'Agora está seguindo!' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao alternar seguimento: ' + error.message });
  }
}

export async function verificarSeguindo(req, res) {
  const { seguidor_id, seguido_id } = req.query;

  try {
    const seguindo = await verificarSeguimento(seguidor_id, seguido_id);
    res.json({ seguindo });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao verificar seguimento: ' + error.message });
  }
}
