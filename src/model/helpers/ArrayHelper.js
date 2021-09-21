export default class ArrayHelper {
  static removeFromArray(array, itemToRemove) {
    if (!array.includes(itemToRemove)) { return array; }

    const removeExclusive = array.slice(0);
    removeExclusive.splice(removeExclusive.indexOf(itemToRemove), 1);
    return removeExclusive;
  }
}
