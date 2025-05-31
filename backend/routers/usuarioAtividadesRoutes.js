import express from 'express';
import {
  adicionarTag,
  removerTag,
  listarTags
} from '../controllers/usuarioAtividadesController.js';

const router = express.Router();

router.post('/adicionar', adicionarTag);
router.delete('/remover', removerTag);
router.get('/:usuario_id', listarTags);

export default router;
