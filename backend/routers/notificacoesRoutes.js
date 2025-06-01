import express from 'express';
import { novaNotificacao, listarNotificacoes, lerNotificacao } from '../controllers/notificacoesController.js';

const router = express.Router();

router.post('/', novaNotificacao);
router.get('/:usuario_id', listarNotificacoes);
router.put('/ler/:id', lerNotificacao);

export default router;
