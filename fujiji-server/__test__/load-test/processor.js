const { faker } = require('@faker-js/faker');

const conditions = ['new', 'refurbished', 'used'];

const categories = [
  'Bed',
  'Cabinet',
  'Chair',
  'Desk',
  'Sofa',
  'Table',
  'Other',
];

const locations = [
  {
    city: 'Winnipeg',
    provinceCode: 'MB',
  },
  {
    city: 'Vancouver',
    provinceCode: 'BC',
  },
  {
    city: 'Toronto',
    provinceCode: 'ON',
  },
];

function generateSignUpData(requestParams, ctx, ee, next) {
  ctx.vars.email = faker.internet.email();
  ctx.vars.password = faker.internet.password(10);
  ctx.vars.name = faker.name.findName();
  ctx.vars.phoneNumber = '2041234444';
  return next();
}

function generateListingData(requestParams, ctx, ee, next) {
  const location = locations[Math.floor(Math.random() * locations.length)];
  ctx.vars.userID = parseInt(ctx.vars.userID, 10);
  ctx.vars.title = `Posting for ${ctx.vars.name}`;
  ctx.vars.condition = conditions[Math.floor(Math.random() * conditions.length)];
  ctx.vars.category = categories[Math.floor(Math.random() * categories.length)];
  ctx.vars.city = location.city;
  ctx.vars.provinceCode = location.provinceCode;
  ctx.vars.imageURL = 'https://source.unsplash.com/ueJ2oJeEK-U/';
  ctx.vars.price = faker.datatype.float({ max: 1000 });
  ctx.vars.description = faker.lorem.text();
  return next();
}

function generateCommentData(requestParams, ctx, ee, next) {
  ctx.vars.comment = faker.lorem.text();
  return next();
}

function getRandomListingId(requestParams, response, ctx, ee, next) {
  const resBody = JSON.parse(response.body);
  const { listings } = resBody;
  ctx.vars.randListingID = listings[Math.floor(Math.random() * listings.length)].listing_id;
  return next();
}

module.exports = {
  generateSignUpData,
  generateListingData,
  generateCommentData,
  getRandomListingId,
};
