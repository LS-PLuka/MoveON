import express from 'express';
import { toggleCurtida } from '../controllers/curtidasController.js';

const router = express.Router();

router.post('/toggle/:postagemId', toggleCurtida);

export default router;
