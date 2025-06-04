// routers/mensagensRoutes.js
import express from 'express';
import {
  novaMensagem,
  listarMensagens,
  atualizarMensagem,
  deletarMensagem
} from '../controllers/mensagensController.js';

const router = express.Router();

router.post('/', novaMensagem);
router.get('/', listarMensagens);
router.put('/:id', atualizarMensagem);
router.delete('/:id', deletarMensagem);

export default router;
