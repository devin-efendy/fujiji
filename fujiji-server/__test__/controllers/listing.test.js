const request = require('supertest');
const app = require('../../src/app');
const { mockUser, seedTestDB, tearDownDB } = require('../dbSetup');

describe('Test /listing endpoints', () => {
  describe('GET /listing', () => {
    beforeEach(async () => {
      await tearDownDB();
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

    it('nonexistent city returns expected error', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'None' });
      expect(res.statusCode).toEqual(404);
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

    it('successfully get all listings by existing city and category', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'Winnipeg', category: 'Other' });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing province and category', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ provinceCode: 'MB', category: 'Other' });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing city and condition', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'Winnipeg', condition: 'used' });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing province and condition', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ provinceCode: 'MB', condition: 'used' });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing city and valid priceRange', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'Winnipeg', priceRange: [0, 100] });
      expect(res.statusCode).toEqual(200);
    });

    it('successfully get all listings by existing province and valid priceRange', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ provinceCode: 'MB', priceRange: [0, 100] });
      expect(res.statusCode).toEqual(200);
    });

    it('invalid price range with existing city returns expected error', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ city: 'Winnipeg', priceRange: [100] });
      expect(res.statusCode).toEqual(400);
    });

    it('invalid price range with existing province returns expected error', async () => {
      const res = await request(app)
        .get('/listing')
        .query({ provinceCode: 'MB', priceRange: [100] });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /listing', () => {
    let token;
    let userid;

    beforeEach(async () => {
      await seedTestDB();
      const mockUserReqBody = {
        email: mockUser.email,
        password: mockUser.password,
      };
      const signinRes = await request(app).post('/auth/signin').send(mockUserReqBody);
      token = signinRes.body.authToken;
      userid = signinRes.body.userId;
    });

    afterEach(async () => {
      await tearDownDB();
    });

    it('returns expected error when not signed in user try to post', async () => {
      const mockReqBody = {
        userID: 10,
        title: 'Dining Table In Good Condition',
        condition: 'used',
        category: 'Table',
        city: 'Winnipeg',
        provinceCode: 'MB',
        imageURL: 'https://source.unsplash.com/gySMaocSdqs/',
        price: 50,
        description: 'Just used for 3 years',
      };
      const res = await request(app).post('/listing').send(mockReqBody);
      expect(res.statusCode).toEqual(400);
    });

    it('successfully post a listing when a user is signed in', async () => {
      const mockReqBody = {
        userID: userid,
        title: 'Kitchen set in Good Condition',
        condition: 'new',
        category: 'Other',
        city: 'Winnipeg',
        provinceCode: 'MB',
        imageURL: 'https://source.unsplash.com/gySMaocSdqs/',
        price: 1000,
        description: 'Sparkling Kitchen set',
      };
      const res = await request(app).post('/listing').set('Authorization', `Bearer ${token}`).send(mockReqBody);
      expect(res.statusCode).toEqual(200);
    });
  });
});
