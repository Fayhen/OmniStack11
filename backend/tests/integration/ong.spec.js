const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create new ONG', async () => {
    const response =  await request(app)
      .post('/ongs')
      .send({
        name: "Test ONG",
        email: "test@email.com",
        whatsapp: "9012345678",
        city: "Belém",
        uf: "PA"
      })

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});
