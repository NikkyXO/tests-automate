import { request } from 'src/config/setup';
import '@jest/globals';

describe('Auth Integration Tests', () => {
  it('should be able to register', async () => {
    const response = await request
      .post('/auth/register')
      .send({ username: 'validUser', password: 'validPassword' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
  });
  it('should login with valid credentials', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: 'validUser', password: 'validPassword' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('accessToken');
    expect(response.body).to.have.property('user');
  });

  it('should fail login with wrong username', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: 'invalidUser', password: 'validPassword' });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.be('User not Found');
  });

  it('should fail login with invalid password', async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: 'validUser', password: 'wrongPassword' });

    expect(response.status).to.equal(401);
    expect(response.body.message).to.be('Invalid Password');
  });
});
