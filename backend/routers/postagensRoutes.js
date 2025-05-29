import express from 'express';
import { novaPostagem } from '../controllers/postagensController.js';
import upload from '../config/upload.js'; // caminho do arquivo acima

const router = express.Router();

router.post('/', upload.single('imagem'), novaPostagem);

export default router;
