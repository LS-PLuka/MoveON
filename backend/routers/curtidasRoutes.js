import express from 'express';
import { novaCurtida } from '../controllers/curtidasController.js';

const router = express.Router();
router.post('/curtidas', novaCurtida);

export default router;
