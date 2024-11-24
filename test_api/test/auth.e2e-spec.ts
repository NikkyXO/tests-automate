import { expect } from '@jest/globals';
import { request } from './setup';
import { v4 as uuidv4 } from 'uuid';

describe('Auth Integration Tests', () => {
  const uniqueUsername = `User-${uuidv4()}`;
  it('should be able to register', async () => {
    const response = await request
      .post('/auth/signup')
      .send({ username: uniqueUsername, password: 'validPassword' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
  it('should login with valid credentials', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: uniqueUsername, password: 'validPassword' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('user');
  });

  it('should fail login with wrong username', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: 'invalidUser', password: 'validPassword' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not Found');
  });

  it('should fail login with invalid password', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: uniqueUsername, password: 'wrongPassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid Password');
  });
});
