import express from 'express';
import { novaNotificacao } from '../controllers/notificacoesController.js';

const router = express.Router();
router.post('/notificacoes', novaNotificacao);

export default router;
