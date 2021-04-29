import RandomNumberGenerator from '../RandomNumberGenerator';
import TestRandomNumberGenerator from '../__mocks__/TestRandomNumberGenerator';

test('Generate Non-Random Number', () => {
  const number = RandomNumberGenerator.generateRandomNumber(1, 1);
  expect(number).toBe(1);
});

test('Generate Random Number', () => {
  const number = RandomNumberGenerator.generateRandomNumber(5, 12);
  expect(number).toBeGreaterThanOrEqual(5);
  expect(number).toBeLessThanOrEqual(12);
});

test('Generate Fake Random Number', () => {
  const number = TestRandomNumberGenerator.generateRandomNumber(5, 12);
  expect(number).toBe(5);
});

test('Cycle through fake random numbers', () => {
  let number = TestRandomNumberGenerator.generateRandomNumber(1, 2);
  expect(number).toBe(1);
  number = TestRandomNumberGenerator.generateRandomNumber(1, 2);
  expect(number).toBe(2);
  number = TestRandomNumberGenerator.generateRandomNumber(1, 2);
  expect(number).toBe(1);
});

test('Generate and clear test random numbers', () => {
  let number = TestRandomNumberGenerator.generateRandomNumber(5, 12);
  expect(number).toBe(5);
  number = TestRandomNumberGenerator.generateRandomNumber(5, 12);
  expect(number).toBe(6);
  TestRandomNumberGenerator.clearState();
  number = TestRandomNumberGenerator.generateRandomNumber(5, 12);
  expect(number).toBe(5);
});

test('Generate different test random numbers', () => {
  let number = TestRandomNumberGenerator.generateRandomNumber(2, 3);
  expect(number).toBe(2);
  number = TestRandomNumberGenerator.generateRandomNumber(10, 15);
  expect(number).toBe(10);
});
