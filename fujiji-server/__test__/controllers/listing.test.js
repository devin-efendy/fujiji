const request = require('supertest');
const app = require('../../src/app');
const { seedTestDB, tearDownDB } = require('../dbSetup');

describe('Test /listing endpoints', () => {
  describe('GET /listing', () => {
    beforeEach(async () => {
      await seedTestDB();
    });

    afterEach(async () => {
      await tearDownDB();
    });

    it('successfully get all listings by existing city', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'Winnipeg' });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing province', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ provinceCode: 'MB' });
      expect(res.statusCode).toEqual(200);
    });

    it('undefined location returns expected error', async () => {
      const res = await request(app).get('/listing');
      expect(res.statusCode).toEqual(400);
    });
  });
});
