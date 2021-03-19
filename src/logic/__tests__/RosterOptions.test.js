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

test('Empty restricted and required units should preserve the roster', () => {
  const r = new RosterOptions(['a', 'b', 'c', 'd']);
  expect(r.roster).toEqual(['a', 'b', 'c', 'd']);
});

test('restricted and required units should be filtered', () => {
  const r = new RosterOptions(['a', 'b', 'c', 'd'], ['a'], ['b']);
  expect(r.roster).toEqual(['c', 'd']);
});
