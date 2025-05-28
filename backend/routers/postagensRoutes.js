import express from 'express';
import { novaPostagem } from '../controllers/postagensController.js';

const router = express.Router();
router.post('/', novaPostagem);

export default router;
