import supertest from 'supertest';

test('deve obter sucesso ao cadastrar um autor', async () => {
    const inputData = {
      name: 'Fernando Junior',
    };
    const response = await supertest('http://localhost:3000').post('/authors').send(inputData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('authors created successfuly');
  });

  test('deve falhar ao tentar cadastrar um autor', async () => {
    const inputData = {
        name: 'Fernando Junior',

    };
  
    const response = await supertest('http://localhost:3000').post('/authors').send(inputData);
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('autor não pode ser vazio');
  });