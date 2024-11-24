import { v4 as uuidv4 } from 'uuid';

describe('Authentication API Tests', () => {
  const baseUrl = Cypress.env('baseUrl');
  const uniqueUsername = `User-${uuidv4()}`;
  const testPassword = 'TestPassword123!';

  it('should register a new user', () => {
    cy.request('POST', `${baseUrl}/auth/signup`, {
      username: uniqueUsername,
      password: testPassword,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('username');
    });
  });

  it('should log in with valid credentials', () => {
    cy.request('POST', `${baseUrl}/auth/login`, {
      username: uniqueUsername,
      password: testPassword,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('accessToken');
      expect(response.body).to.have.property('user');
    });
  });

  it('should not log in with invalid username', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        username: 'wrongUsername',
        password: testPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message', 'User not Found');
    });
  });

  it('should not log in with invalid password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        username: uniqueUsername,
        password: 'WrongPassword123!',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Invalid Password');
    });
  });
});
