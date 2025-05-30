import express from 'express';
import { novoComentario, obterComentarios } from '../controllers/comentariosController.js';

const router = express.Router();

router.post('/:postagem_id/comentarios', novoComentario);
router.get('/:postagem_id/comentarios', obterComentarios);

export default router;
