const request = require('supertest');
const app = require('../../src/app');
const { mockUser, seedTestDB, tearDownDB } = require('../dbSetup');

describe('Test /boost endpoints', () => {
  describe('POST /boost/:listing_id', () => {
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
      token = signinRes.body.authToken;
      userid = signinRes.body.userId;
    });

    afterEach(async () => {
      await tearDownDB();
    });

    it('Successfully created a boost', async () => {
      const mockPostListingReqBody = {
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
        .send(mockPostListingReqBody);

      const postBoostRes = await request(app)
        .post(`/boost/${postListingRes.body.listingId}`)
        .query({ packageID: 1 })
        .set('Authorization', `Bearer ${token}`)
        .send({ packageID: 1 });

      expect(postBoostRes.statusCode).toEqual(200);
    });

    it('Should return 404 error if listing does not exist', async () => {
      const postCommentRes = await request(app)
        .post('/boost/123123')
        .query({ packageID: 1 })
        .set('Authorization', `Bearer ${token}`);

      expect(postCommentRes.statusCode).toEqual(404);
    });

    it('Should return 404 error if package does not exist', async () => {
      const mockPostListingReqBody = {
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
        .send(mockPostListingReqBody);

      const postBoostRes = await request(app)
        .post(`/boost/${postListingRes.body.listingId}`)
        .query({ packageID: 4 })
        .set('Authorization', `Bearer ${token}`);
      expect(postBoostRes.statusCode).toEqual(404);
    });
  });
});
