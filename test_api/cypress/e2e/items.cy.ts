describe('Authentication API Tests', () => {
  const baseUrl = Cypress.env('baseUrl') || 'https://qa-test-9di7.onrender.com';

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/auth/reset-database`, {});
  });

  it('should log in with valid credentials', () => {
    cy.request('POST', `${baseUrl}/auth/login`, {
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('accessToken');
      expect(response.body).to.have.property('user');
    });
  });

  it('should create a new item', () => {
    cy.request('POST', `${baseUrl}/items`, {
      name: 'Test Item',
      description: 'This is a test item',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Test Item');
      expect(response.body).to.have.property(
        'description',
        'This is a test item',
      );
      expect(response.body).to.have.property('user');
    });
  });

  it('should fetch all items', () => {
    cy.request('GET', `${baseUrl}/items`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should fetch a specific item', () => {
    cy.request('GET', `${baseUrl}/items/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name', 'Test Item');
      expect(response.body).to.have.property(
        'description',
        'This is a test item',
      );
      expect(response.body).to.have.property('user');
    });
  });

  it('should fetch a item with creator details', () => {
    cy.request('GET', `${baseUrl}/items/1?join=user`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name', 'Test Item');
      expect(response.body).to.have.property(
        'description',
        'This is a test item',
      );
      expect(response.body).to.have.property('user');
    });
  });

  it('should update an item', () => {
    cy.request('PATCH', `${baseUrl}/items/1`, {
      name: 'Updated Item',
      description: 'Updated description',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Updated Item');
      expect(response.body).to.have.property(
        'description',
        'Updated description',
      );
    });
  });

  it('should delete an item', () => {
    cy.request('DELETE', `${baseUrl}/items/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
