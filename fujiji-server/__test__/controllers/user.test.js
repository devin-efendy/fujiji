const request = require('supertest');
const app = require('../../src/app');
const { mockUser, seedTestDB, tearDownDB } = require('../dbSetup');

describe('Test /user endpoints', () => {
  describe('GET /user/:id', () => {
    let userid;

    beforeEach(async () => {
      await tearDownDB();
      await seedTestDB();
      const mockUserReqBody = {
        email: mockUser.email,
        password: mockUser.password,
      };
      const signinRes = await request(app)
        .post('/auth/signin')
        .send(mockUserReqBody);
      userid = signinRes.body.userId;
    });

    afterEach(async () => {
      await tearDownDB();
    });

    it('successfully get a user with valid id', async () => {
      const res = await request(app)
        .get(`/user/${userid}`);
      expect(res.statusCode).toEqual(200);
    });

    it('invalid user id returns expected error', async () => {
      const res = await request(app)
        .get('/user/ye12');
      expect(res.statusCode).toEqual(400);
    });

    it('non-existent user id returns expected error', async () => {
      const res = await request(app)
        .get('/user/12345678');
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /user/:id/listings', () => {
    let token;
    let userid;

    beforeEach(async () => {
      await tearDownDB();
      await seedTestDB();
      const mockUserReqBody = {
        email: mockUser.email,
        password: mockUser.password,
      };
      const signinRes = await request(app)
        .post('/auth/signin')
        .send(mockUserReqBody);
      expect(signinRes.statusCode).toEqual(200);
      token = signinRes.body.authToken;
      userid = signinRes.body.userId;

      const mockListingReqBody = {
        userID: userid,
        title: 'Dining Table In Good Condition',
        condition: 'used',
        category: 'Table',
        city: 'Winnipeg',
        provinceCode: 'MB',
        imageURL: 'https://source.unsplash.com/gySMaocSdqs/',
        price: 50,
        description: 'Just used for 3 years',
      };
      const postListingRes = await request(app)
        .post('/listing')
        .set('Authorization', `Bearer ${token}`)
        .send(mockListingReqBody);
      expect(postListingRes.statusCode).toEqual(200);
    });

    afterEach(async () => {
      await tearDownDB();
    });

    it('successfully get a signed-in user\' listings', async () => {
      const res = await request(app)
        .get(`/user/${userid}/listings`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    });

    it('no listings posted by the user returns expected error', async () => {
      const mockNewUserReqBody = {
        email: 'test_user_2@email.com',
        password: 'my_strong_password',
        name: 'bob-test-user-2',
        phoneNumber: '2041234444',
      };
      const signupRes = await request(app)
        .post('/auth/signup')
        .send(mockNewUserReqBody);
      expect(signupRes.statusCode).toEqual(200);
      const newUserid = signupRes.body.userId;
      const newUserToken = signupRes.body.authToken;

      const res = await request(app)
        .get(`/user/${newUserid}/listings`)
        .set('Authorization', `Bearer ${newUserToken}`);
      expect(res.statusCode).toEqual(500);
    });

    it('not signed-in user returns an expected error', async () => {
      const res = await request(app)
        .get(`/user/${userid}/listings`);
      expect(res.statusCode).toEqual(400);
    });

    it('invalid user id returns expected error', async () => {
      const res = await request(app)
        .get('/user/ye12/listings');
      expect(res.statusCode).toEqual(400);
    });
  });
});
