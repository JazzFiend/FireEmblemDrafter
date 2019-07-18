import RandomElementSelector from '../../src/logic/RandomElementSelector';
import TestRandomNumberGenerator from '../../src/logic/TestRandomNumberGenerator';

let randomElementSelector;

beforeEach(() => {
  randomElementSelector = new RandomElementSelector(new TestRandomNumberGenerator());
});

test('Empty Set', () => {
  expect(() => {
    randomElementSelector.pullRandomElements([], 0);
  }).toThrow(TypeError);
});

test('Selection is larger than set', () => {
  expect(() => {
    randomElementSelector.pullRandomElements([1], 2);
  }).toThrow(RangeError);
});

test('Selection and set size are equal', () => {
  let newList = randomElementSelector.pullRandomElements([1], 1);
  expect(newList.length).toBe(1);
  expect(newList.includes(1)).toBeTruthy();
});

test('Pick one out of two items', () => {
  let newList = randomElementSelector.pullRandomElements([1, 2], 1);
  expect(newList.length).toBe(1);
  expect(newList.includes(2)).toBeTruthy();
});

test('Pick one out of two strings', () => {
  let newList = randomElementSelector.pullRandomElements(['1', '2'], 1);
  expect(newList.length).toBe(1);
  expect(newList.includes('2')).toBeTruthy();
});

test('Pick three out of ten items', () => {
  let newList = randomElementSelector.pullRandomElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
  expect(newList.length).toBe(3);
  expect(newList.includes(2)).toBeTruthy();
  expect(newList.includes(4)).toBeTruthy();
  expect(newList.includes(6)).toBeTruthy();
})