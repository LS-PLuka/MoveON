import express from 'express';
import { novaNotificacao } from '../controllers/notificacoesController.js';

const router = express.Router();
router.post('/', novaNotificacao);

export default router;
