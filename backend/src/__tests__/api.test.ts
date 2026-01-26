import request from 'supertest';
import { app } from '../server';

describe('API Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });
});

describe('Authentication', () => {
  it('should register a new user', async () => {
    const userData = {
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'freelancer'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should login with valid credentials', async () => {
    // First register a user
    const userData = {
      email: `login${Date.now()}@example.com`,
      password: 'password123',
      firstName: 'Login',
      lastName: 'Test',
      role: 'client'
    };

    await request(app).post('/api/auth/register').send(userData);

    // Then try to login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should reject invalid login credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });
});
