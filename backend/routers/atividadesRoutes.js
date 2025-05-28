import express from 'express';
import { getAtividades } from '../controllers/atividadesController.js';

const router = express.Router();
router.get('/', getAtividades);

export default router;
