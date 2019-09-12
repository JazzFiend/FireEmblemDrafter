export default class RandomNumberGenerator {
  static generateRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  }
}
