export interface User { email: string; password: string }

export const validUser: User = {
  email: 'customer3@practicesoftwaretesting.com',
  password: 'pass123',
};

export const invalidUser: User = {
  email: 'nobody@example.com',
  password: 'wrongpassword',
};