import fs from 'fs';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import Admin from '../src/models/admin.model.js';
import { obterTokenAdmin, obterTokenAluno } from './helpers/auth.helper.js';

const massa = JSON.parse(
  fs.readFileSync('./test/fixtures/massaAlunos.json', 'utf-8')
);

describe('Fluxo E2E: Cadastro de Aluno e Entrega de Trabalho', () => {
  let tokenAdmin;
  let tokenAluno;

  before(async () => {
    await Admin.deleteMany({});
    await Admin.create({
      nome: 'Administrador',
      email: process.env.ADMIN_EMAIL || 'admin@escola.com',
      senha: process.env.ADMIN_PASSWORD || 'admin123'
    });
  });

  it('1. Deve obter token de Administrador via Helper', async () => {
    tokenAdmin = await obterTokenAdmin();
    expect(tokenAdmin).to.be.a('string').and.not.be.empty;
  });

  it('2. Deve cadastrar um novo aluno como Administrador (DDT)', async () => {
    const resposta = await request(app)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(massa.novoAluno);

    // Se falhar, mostra o erro exato que a API retornou no terminal
    if (resposta.status !== 201 && resposta.status !== 200) {
      console.log('--- DETALHE DO ERRO DA API ---', resposta.body);
    }

    expect(resposta.status).to.be.oneOf([201, 200]);
  });

  it('3. Deve realizar login como o novo aluno cadastrado via Helper', async () => {
    tokenAluno = await obterTokenAluno(
      massa.novoAluno.email,
      massa.novoAluno.senha
    );
    expect(tokenAluno).to.be.a('string').and.not.be.empty;
  });

  it('4. Deve registrar a entrega de um trabalho logado como Aluno (DDT)', async () => {
    const resposta = await request(app)
      .post('/api/trabalhos')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send(massa.entregaTrabalho);

    if (resposta.status !== 201 && resposta.status !== 200) {
      console.log('--- DETALHE DO ERRO DA ENTREGA ---', resposta.body);
    }

    expect(resposta.status).to.be.oneOf([201, 200]);
  });
});