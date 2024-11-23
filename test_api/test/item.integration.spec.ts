import { request } from 'src/config/setup';

describe('Items Integration Tests', () => {
  let token: string;
  let itemId: string;

  beforeAll(async () => {
    const response = await request
      .post('/auth/login')
      .send({ username: 'validUser', password: 'validPassword' });

    token = response.body.accessToken;
  });

  it('should create a new item', async () => {
    const newName = 'New Item';
    const newDescription = 'Item description for testing';
    const response = await request
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName, description: newDescription });
    itemId = response.body.id;
    expect(response.status).to.equal(201);
    expect(response.body.name).to.equal(newName);
    expect(response.body.description).to.equal(newDescription);
    expect(response.body).to.have.property('user');
  });

  it('should fetch all items', async () => {
    const response = await request
      .get('/items')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(Array.isArray(response.body)).to.equal(true);
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should fetch a specific item', async () => {
    const response = await request
      .get(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(itemId);
  });

  it('should fetch an item with creator details', async () => {
    const response = await request
      .get(`/items/${itemId}?join=user`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(itemId);
    expect(response.body.user.username).to.equal('validUser');
  });

  it('should update an item', async () => {
    const newName = 'Updated Item';
    const newDescription = 'Updated Item description';
    const response = await request
      .patch(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName, description: newDescription });

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(newName);
    expect(response.body.description).to.equal(newDescription);
  });

  it('should delete an item', async () => {
    const response = await request
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
  });
});
