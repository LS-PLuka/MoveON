import express from 'express';
import { novoComentario } from '../controllers/comentariosController.js';

const router = express.Router();

router.post('/', novoComentario);

export default router;
