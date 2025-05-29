import express from 'express';
import { novaNotificacao, listarNotificacoes } from '../controllers/notificacoesController.js';

const router = express.Router();

router.post('/', novaNotificacao);
router.get('/:usuario_id', listarNotificacoes);

export default router;
