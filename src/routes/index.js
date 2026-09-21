import { Router } from 'express';
import adminRoutes from './admin/index.js';
import alunoRoutes from './aluno.routes.js';
import authRoutes from './auth.routes.js';
import trabalhosRoutes from './admin/trabalho.routes.js'; // Aponta para dentro da pasta admin

const router = Router();

// Rota pública de autenticação.
router.use('/auth', authRoutes);

router.use('/admin', adminRoutes);
router.use('/alunos', alunoRoutes);
router.use('/trabalhos', trabalhosRoutes); // O prefixo continua /trabalhos para a API

export default router;