import express from 'express';
import { novaAtividade } from '../controllers/usuarioAtividadesController.js';

const router = express.Router();
router.post('/usuario-atividades', novaAtividade);

export default router;
