const { testGetUser } = require('../repositories/user');

async function testEndpoint(req, res) {
  const result = await testGetUser();
  res.status(200).json({ message: 'Hello from Fujiji API!', result });
}

module.exports = { testEndpoint };
