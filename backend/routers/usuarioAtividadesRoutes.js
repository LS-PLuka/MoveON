import express from 'express';
import { novaAtividade } from '../controllers/usuarioAtividadesController.js';

const router = express.Router();
router.post('/', novaAtividade);

export default router;
