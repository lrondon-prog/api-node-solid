import supertest from 'supertest';

test('deve obter sucesso ao cadastrar um autor', async () => {
  const inputData = {
    name: 'Robert C. Martin',
  };

  const response = await supertest('http://localhost:3000').post('/authors').send(inputData);

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('author created');
});

test('deve falhar ao tentar cadastrar um autor sem nome', async () => {
  const inputData = {
    name: '',
  };

  const response = await supertest('http://localhost:3000').post('/authors').send(inputData);

  expect(response.status).toBe(400);
  expect(response.body.message).toBe('autor é obrigatório e não pode ser vazio');
});