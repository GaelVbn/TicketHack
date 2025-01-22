const { checkBody } = require('./checkBody');

it('checkBody - Valid body', () => {
  const body = { email: 'test@gmail.com', password: 'azerty123' };
  expect(checkBody(body, ['email', 'password'])).toBe(true);
});

it('checkBody - Invalid body', () => {
  const body = { email: 'test@gmail.com' };
  expect(checkBody(body, ['email', 'password'])).toBe(false);
});
