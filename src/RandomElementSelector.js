export default class RandomElementSelector {

  constructor(randomNumberGenerator) {
    this.randomNumberGenerator = randomNumberGenerator;
  }

  pullRandomElements(originalList, numberOfElements) {
    this._checkInputs(originalList, numberOfElements);
    let randomList = [];
    let listToConsider = originalList;
    for(let i = 0; i < numberOfElements; i++) {
      let index = this.randomNumberGenerator.generateRandomNumber(0, originalList.length - 1);
      randomList.push(listToConsider[index]);
      listToConsider = this._removeElement(listToConsider, index);
    }
    return randomList;
  }

  _checkInputs(rootList, numElements) {
    if (rootList.length === 0) {
      throw new TypeError('Number of random items is larger than the set itself.');
    }
    if (numElements > rootList.length) {
      throw new RangeError('Number of random items is larger than the set itself.');
    }
  }

  _removeElement(list, indexToRemove) {
    let newList = [];
    for(let i = 0; i < list.length; i++) {
      if(i !== indexToRemove) {
        newList.push(list[i]);
      }
    }
    return newList;
  }
}
