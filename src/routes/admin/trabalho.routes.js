import { Router } from 'express';
import { listar, buscarPorId, registrar, corrigir, remover } from '../../controllers/trabalhos.controller.js';

const router = Router();

router.get('/', listar);
router.post('/', registrar);
router.get('/:id', buscarPorId);
router.put('/:id', corrigir);
router.delete('/:id', remover);

export default router;