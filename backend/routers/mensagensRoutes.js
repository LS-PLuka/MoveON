import express from 'express';
import { novaMensagem } from '../controllers/mensagensController.js';

const router = express.Router();
router.post('/', novaMensagem);

export default router;
