import express from 'express';
import {
  novaPostagem,
  excluirPostagem,
  buscarFeedComCurtidas,
  buscarPostagensUsuario,
  editarPostagem
} from '../controllers/postagensController.js';

import upload from '../config/upload.js';

const router = express.Router();

router.post('/', upload.single('imagem'), novaPostagem);
router.delete('/:id', excluirPostagem);
router.get('/feed/:usuarioId', buscarFeedComCurtidas);
router.get('/usuario/:usuarioId', buscarPostagensUsuario);
router.put('/:id', editarPostagem);

export default router;
