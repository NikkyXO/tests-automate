import supertest from 'supertest';

export const BASE_URL = 'https://qa-test-9di7.onrender.com';
export const request = supertest(BASE_URL);

beforeAll(async () => {
  try {
    const response = await request.get('/');
    if (response.status !== 200) {
      console.warn(
        `Warning: Server health check returned status ${response.status}`,
      );
    }
  } catch (error) {
    console.error('Failed to connect to server:', error);
    throw error;
  }
});
