import RandomNumberGenerator from '../RandomNumberGenerator';

export default class TestRandomNumberGenerator extends RandomNumberGenerator {
  constructor() {
    super();
    this.counter = 0;
  }

  static generateRandomNumber(minValue, maxValue) {
    if (this.counter >= 1) {
      this.counter += 1;
    } else {
      this.counter = 1;
    }

    if (this.counter > maxValue || this.counter < minValue) {
      this.counter = minValue;
    }
    return this.counter;
  }

  static clearState() {
    this.counter = 0;
  }
}
