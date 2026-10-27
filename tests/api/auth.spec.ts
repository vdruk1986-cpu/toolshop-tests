import { test, expect } from '../../fixtures/fixtures';
import { validUser, invalidUser } from '../../data/users';

test('POST /users/login with valid credentials returns a token', async ({ authApi}) => {
   
    const response = await authApi.login(validUser.email, validUser.password);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
});

test('POST /users/login with invalid credentials returns 401 error', async ({ authApi }) => {

    const response = await authApi.login(invalidUser.email, invalidUser.password);

    expect(response.status()).toBe(401);
    expect(await response.json()).not.toHaveProperty('access_token');
});