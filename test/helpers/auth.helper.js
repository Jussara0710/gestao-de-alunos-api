import request from 'supertest';
import app from '../../src/app.js';
import 'dotenv/config';

/**
 * Realiza login como Administrador e retorna o token JWT
 */
export async function obterTokenAdmin() {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: process.env.ADMIN_EMAIL || 'admin@escola.com',
      senha: process.env.ADMIN_PASSWORD || 'admin123'
    });

  return response.body.token;
}

/**
 * Realiza login com as credenciais de um Aluno e retorna o token JWT
 */
export async function obterTokenAluno(email, senha) {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email, senha });

  return response.body.token;
}