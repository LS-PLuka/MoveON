import express from 'express';
import { novoSeguidor } from '../controllers/seguidoresController.js';

const router = express.Router();
router.post('/seguidores', novoSeguidor);

export default router;
