import express from 'express';
import { listarAmigos } from '../controllers/amigosController.js';

const router = express.Router();

router.get('/:id', listarAmigos);

export default router;
