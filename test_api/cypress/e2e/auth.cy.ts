describe('Authentication API Tests', () => {
  const baseUrl = Cypress.env('baseUrl') || 'https://qa-test-9di7.onrender.com';

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/auth/reset-database`, {});
  });
  it('should register a new user', () => {
    cy.request('POST', `${baseUrl}/auth/register`, {
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('accessToken');
      expect(response.body).to.have.property('user');
    });
  });

  it('should log in with valid credentials', () => {
    cy.request('POST', `${baseUrl}/auth/login`, {
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('accessToken');
    });
  });

  it('should not log in with invalid username', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        email: 'wronguser@example.com',
        password: 'TestPassword123!',
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
        email: 'testuser@example.com',
        password: 'WrongPassword123!',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Invalid Password');
    });
  });
});
