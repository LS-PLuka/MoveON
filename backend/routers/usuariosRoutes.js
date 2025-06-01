import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuarioController,
  deletarUsuarioController,
  buscarUsuarioPorNomeUsuario
} from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuario);
router.put('/:id', atualizarUsuarioController);
router.delete('/:id', deletarUsuarioController);
router.get('/usuario/:usuario', buscarUsuarioPorNomeUsuario);

export default router;
