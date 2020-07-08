import RosterOptions from '../helpers/RosterOptions';

test('Empty roster should error', () => {
  expect(() => {
    new RosterOptions([]);
  }).toThrow(TypeError);
});

test('Incorrect restricted value should throw', () => {
  expect(() => {
    new RosterOptions(['a', 'b', 'c', 'd'], ['f']);
  }).toThrow(TypeError);
});

test('Incorrect required value should throw', () => {
  expect(() => {
    new RosterOptions(['a', 'b', 'c', 'd'], ['a'], ['f']);
  }).toThrow(TypeError);
});
