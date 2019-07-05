import _ from 'lodash';

export default class RandomElementSelector {
  constructor(randomNumberGenerator) {
    this.randomNumberGenerator = randomNumberGenerator;
  }

  pullRandomElements(originalList, numberOfElements) {
    this._checkInputs(originalList, numberOfElements);
    let randomList = [];
    let listToConsider = originalList;
    for(let i = 0; i < numberOfElements; i++) {
      let indexToPull = this.randomNumberGenerator.generateRandomNumber(0, originalList.length - 1);
      randomList.push(listToConsider[indexToPull]);
      _.remove(listToConsider, function(element, index) {
        return index === indexToPull;
      });
    }
    return randomList;
  }

  _checkInputs(rootList, numElements) {
    if (rootList.length === 0) {
      throw new TypeError('Input list is empty.');
    }
    if (numElements > rootList.length) {
      throw new RangeError('Number of random items is larger than the set itself.');
    }
  }
}
