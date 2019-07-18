export default class RandomNumberGenerator {
  constructor() {}

  generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  }
}