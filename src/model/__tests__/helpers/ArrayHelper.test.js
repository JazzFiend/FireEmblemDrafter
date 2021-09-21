import ArrayHelper from '../../helpers/ArrayHelper';

test('should be able to remove an item from an array', () => {
  const array = [1, 2, 3, 4];
  expect(ArrayHelper.removeFromArray(array, 2)).toEqual([1, 3, 4]);
});

test('should do nothing if item to remove is not in the array', () => {
  const array = [1, 2, 3, 4];
  expect(ArrayHelper.removeFromArray(array, 9)).toEqual(array);
});
