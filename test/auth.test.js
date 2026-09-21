import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('POST /api/auth/login', () => {
  it('Deve responder à rota de autenticação', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@escola.com', senha: 'admin123' });

    expect(resposta.status).to.be.oneOf([200, 401, 400]);
  });
});