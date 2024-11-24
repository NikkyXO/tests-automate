import { v4 as uuidv4 } from 'uuid';
describe('Items API Tests', () => {
  const baseUrl = Cypress.env('baseUrl');
  let token: string;
  let itemId: string;
  const uniqueUsername = `User-${uuidv4()}`;
  const testPassword = 'TestPassword123!';
  const itemName = `Test Item${uuidv4()}`;
  const description = 'This is a test item';

  before(() => {
    // Create test user
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/signup`,
      body: {
        username: uniqueUsername,
        password: testPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        username: uniqueUsername,
        password: testPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      token = response.body.accessToken;
    });
  });

  it('should create a new item', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/items`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: itemName,
        description,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', itemName);
      expect(response.body).to.have.property('description', description);
      // expect(response.body).to.have.property('user');

      itemId = response.body.id;
      cy.log('itemId..', itemId);
    });
  });

  it('should fetch all items', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/items`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should fetch a specific item', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/items/${itemId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', itemId);
      expect(response.body).to.have.property('name', itemName);
      expect(response.body).to.have.property('description', description);
      expect(response.body).to.have.property('userId');
    });
  });

  it('should fetch a item with creator details', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/items/${itemId}?join=user`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', itemId);
      expect(response.body).to.have.property('name', itemName);
      expect(response.body).to.have.property('description', description);
      expect(response.body).to.have.property('user');
    });
  });

  it('should update an item', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/items/${itemId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: 'Updated Item',
        description: 'Updated description',
      },
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
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/items/${itemId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
