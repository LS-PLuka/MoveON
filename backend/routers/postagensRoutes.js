import express from 'express';
import { novaPostagem } from '../controllers/postagensController.js';

const router = express.Router();
router.post('/postagens', novaPostagem);

export default router;
