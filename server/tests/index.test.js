const { handler } = require('../index');

describe('API Handler', () => {
  test('returns 200 for successful request', async () => {
    const event = {
      httpMethod: 'GET',
      path: '/test'
    };

    const response = await handler(event);
    
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toHaveProperty('message');
  });

  test('handles POST request with body', async () => {
    const event = {
      httpMethod: 'POST',
      path: '/test',
      body: JSON.stringify({ test: 'data' })
    };

    const response = await handler(event);
    const body = JSON.parse(response.body);
    
    expect(response.statusCode).toBe(200);
    expect(body.data).toHaveProperty('test', 'data');
  });
});
