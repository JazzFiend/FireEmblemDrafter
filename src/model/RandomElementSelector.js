import _ from 'lodash';

export default class RandomElementSelector {
  constructor(randomNumberGenerator) {
    this.randomNumberGenerator = randomNumberGenerator;
  }

  pullRandomElements(originalList, numberOfElements) {
    RandomElementSelector.checkInputs(originalList, numberOfElements);
    const randomList = [];
    const listToConsider = originalList;
    for (let i = 0; i < numberOfElements; i++) {
      const indexToPull = this.randomNumberGenerator.generateRandomNumber(0, originalList.length - 1);
      randomList.push(listToConsider[indexToPull]);
      _.remove(listToConsider, (element, index) => index === indexToPull);
    }
    return randomList;
  }

  static checkInputs(rootList, numElements) {
    if (rootList.length === 0) {
      throw new TypeError('Input list is empty.');
    }
    if (numElements > rootList.length) {
      throw new RangeError('Number of random items is larger than the set itself.');
    }
  }
}
