import RandomNumberGenerator from "../RandomNumberGenerator";

export default class TestRandomNumberGenerator extends RandomNumberGenerator {
  constructor() {
    super();
    this.counter = 0;
  }

  generateRandomNumber(minValue, maxValue) {
    this.counter++;
    if(this.counter > maxValue || this.counter < minValue) {
      this.counter = minValue;
    }
    return this.counter;
  }

  clearState() {
    this.counter = 0;
  }
}