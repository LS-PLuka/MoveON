import { enviarMensagem } from '../models/mensagens.js';

export async function novaMensagem(req, res) {
  const { remetente_id, destinatario_id, conteudo } = req.body;

  try {
    const id = await enviarMensagem(remetente_id, destinatario_id, conteudo);
    res.status(201).json({ mensagem: 'Mensagem enviada!', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar mensagem: ' + error.message });
  }
}
