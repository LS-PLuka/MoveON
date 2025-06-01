import express from 'express';
import { enviarMensagem, buscarMensagensEntreUsuarios } from '../models/mensagens.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { remetente_id, destinatario_id, conteudo } = req.body;
  try {
    const id = await enviarMensagem(remetente_id, destinatario_id, conteudo);
    res.status(201).json({ mensagem: 'Mensagem enviada!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar mensagem: ' + error.message });
  }
});

router.get('/', async (req, res) => {
  const { usuario1, usuario2 } = req.query;

  if (!usuario1 || !usuario2) {
    return res.status(400).json({ erro: 'Parâmetros usuario1 e usuario2 são obrigatórios' });
  }

  try {
    const mensagens = await buscarMensagensEntreUsuarios(usuario1, usuario2);
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar mensagens: ' + error.message });
  }
});

export default router;
