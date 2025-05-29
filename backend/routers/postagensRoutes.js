import express from 'express';
import { novaPostagem, excluirPostagem } from '../controllers/postagensController.js';
import upload from '../config/upload.js';

const router = express.Router();

router.post('/', upload.single('imagem'), novaPostagem);
router.delete('/:id', excluirPostagem);

export default router;
