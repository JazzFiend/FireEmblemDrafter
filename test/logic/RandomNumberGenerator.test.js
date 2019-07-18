import RandomNumberGenerator from "../../src/logic/RandomNumberGenerator";
import TestRandomNumberGenerator from '../../src/logic/TestRandomNumberGenerator';

test('Generate Non-Random Number', () => {
  let number = new RandomNumberGenerator().generateRandomNumber(1, 1);
  expect(number).toBe(1);
});

test('Generate Random Number', () => {
  let number = new RandomNumberGenerator().generateRandomNumber(5, 12);
  expect(number).toBeGreaterThanOrEqual(5);
  expect(number).toBeLessThanOrEqual(12);
});

test('Generate Fake Random Number', () => {
  let number = new TestRandomNumberGenerator().generateRandomNumber(5, 12);
  expect(number).toBe(5);
});

test('Cycle through fake random numbers', () => {
  let testRng = new TestRandomNumberGenerator();
  let number = testRng.generateRandomNumber(1, 2);
  expect(number).toBe(1);
  number = testRng.generateRandomNumber(1, 2);
  expect(number).toBe(2);
  number = testRng.generateRandomNumber(1, 2);
  expect(number).toBe(1);
});

test('Generate and clear test random numbers', () => {
  let testRng = new TestRandomNumberGenerator();
  let number = testRng.generateRandomNumber(5, 12);
  expect(number).toBe(5);
  number = testRng.generateRandomNumber(5, 12);
  expect(number).toBe(6);
  testRng.clearState();
  number = testRng.generateRandomNumber(5, 12);
  expect(number).toBe(5);
});

test('Generate different test random numbers', () => {
  let testRng = new TestRandomNumberGenerator();
  let number = testRng.generateRandomNumber(2, 3);
  expect(number).toBe(2);
  number = testRng.generateRandomNumber(10, 15);
  expect(number).toBe(10);
});