import express from 'express';
import { alternarSeguidor, verificarSeguindo } from '../controllers/seguidoresController.js';

const router = express.Router();

router.post('/', alternarSeguidor);
router.get('/verificar', verificarSeguindo);

export default router;
