const request = require('supertest');
const app = require('../server');

test('GET /health should return 200 status', async () => {
  const response = await request(app).get('/health');
  expect(response.statusCode).toBe(200);
});

test('GET /nonexistent should return 404', async () => {
  const response = await request(app).get('/nonexistent');
  expect(response.statusCode).toBe(404);
});