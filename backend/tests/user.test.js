const request = require('supertest');
const app = require('../server'); // Make sure this path is correct
const { User, sequelize } = require('../models');

beforeAll(async () => {
  // Initialize database
  await sequelize.sync({ force: true });
  
  // Create test data
  await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'Test@1234'
  });
});

afterAll(async () => {
  await sequelize.close();
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

describe('User API', () => {
  test('GET /users - should return all users', async () => {
    // Make sure your app has this route defined
    const response = await request(app).get('/users');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].username).toBe('testuser');
  });
});