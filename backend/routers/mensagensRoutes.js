import express from 'express';
import { novaMensagem } from '../controllers/mensagensController.js';

const router = express.Router();
router.post('/mensagens', novaMensagem);

export default router;
