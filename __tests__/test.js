const request = require('supertest');
const app = require('../app'); // Adjust the path based on your project structure

describe('POST /contact', () => {
  test('should respond with 201 Created', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'Contact form submitted successfully' });
  });
});

describe('GET /contacts', () => {
  test('should respond with 200 OK and an array of contacts', async () => {
    const response = await request(app).get('/contacts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
