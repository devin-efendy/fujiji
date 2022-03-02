const request = require('supertest');
const app = require('../../src/app');

describe('Test /user endpoints', () => {
  describe('GET /user/:id', () => {
    it('invalid user id returns expected error', async () => {
      const res = await request(app)
        .get('/user/ye12');
      expect(res.statusCode).toEqual(400);
    });
  });
});
