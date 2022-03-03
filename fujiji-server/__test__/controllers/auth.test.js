const request = require('supertest');
const app = require('../../src/app');
const { mockUser, seedTestDB, tearDownDB } = require('../dbSetup');

describe('Test /auth endpoints', () => {
  describe('POST /signup', () => {
    beforeAll(async () => {
      await tearDownDB();
      await seedTestDB();
    });

    afterAll(async () => {
      await tearDownDB();
    });

    it('successfully created a new user with unique email address', async () => {
      const mockReqBody = {
        email: 'test_user_2@email.com',
        password: 'my_strong_password',
        name: 'devin-test-user-2',
        phoneNumber: '2041234444',
      };
      const res = await request(app).post('/auth/signup').send(mockReqBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).toBeUndefined();
      expect(res.body.authToken).toBeDefined();
      expect(res.body.user).toBeDefined();
    });

    it("can't create a user with existing email", async () => {
      const res = await request(app).post('/auth/signup').send(mockUser);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('User with this email address already exists');
    });

    it("can't create a user with empty payload", async () => {
      const res = await request(app).post('/auth/signup').send({});
      expect(res.statusCode).toEqual(500);
    });

    it("can't create a user with invalid payload", async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 123, name: 123, password: 123, phoneNumber: 123,
        });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /signin', () => {
    beforeAll(async () => {
      await seedTestDB();
    });

    afterAll(async () => {
      await tearDownDB();
    });

    it('successfully signed in user', async () => {
      const mockReqBody = {
        email: mockUser.email,
        password: mockUser.password,
      };
      const res = await request(app).get('/auth/signin').send(mockReqBody);
      expect(res.statusCode).toEqual(200);
    });

    it('user provided invalid password', async () => {
      const mockReqBody = {
        email: mockUser.email,
        password: '123',
      };
      const res = await request(app).get('/auth/signin').send(mockReqBody);
      expect(res.statusCode).toEqual(400);
    });

    it('email is not associated with any accounts', async () => {
      const mockReqBody = {
        email: 'non-existent@mail.com',
        password: '123',
      };
      const res = await request(app).get('/auth/signin').send(mockReqBody);
      expect(res.statusCode).toEqual(404);
    });
  });
});
