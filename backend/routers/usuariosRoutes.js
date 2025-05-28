import express from 'express';
import { registrarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();
router.post('/', registrarUsuario);

export default router;
