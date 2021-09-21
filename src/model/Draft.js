import DraftRoster from './DraftRoster';

export default class Draft {
  constructor(draftOptions, teamSize, random, exclusives) {
    Draft._validateInputs(draftOptions, teamSize, random);
    this.roster = new DraftRoster(draftOptions, exclusives);
    this.teamSize = teamSize;
    this.random = random;
    this.team = draftOptions.required.slice();
    this.draftComplete = false;
  }

  static _validateInputs(draftOptions, teamSize, random) {
    if (teamSize > draftOptions.roster.length) {
      throw new RangeError('Team size larger than roster count.');
    }
    if (teamSize === 0) {
      throw new RangeError('Invalid team size.');
    }
    if (!random) {
      throw new TypeError('Must define a random number generator');
    }
  }

  generateNextPick() {
    const pickSize = this._determinePickSize();
    return this.random.pullRandomElements(this.roster.getRoster(), pickSize);
  }

  _determinePickSize() {
    const pickSize = Math.floor(Math.log2(this.teamSize - this.team.length)) + 2;
    if (pickSize > this.roster.getRosterLength()) {
      return this.roster.getRosterLength();
    }
    return pickSize;
  }

  select(selection) {
    if (this.roster.containsItem(selection)) {
      this.team.push(selection);
      this.roster.removeItemFromRoster(selection);
      this.roster.removeExclusives(selection);
      this._checkDraftStatus();
    } else {
      throw new TypeError(`${selection} is not in the roster.`);
    }
  }

  _checkDraftStatus() {
    if (this.team.length === this.teamSize) {
      this.draftComplete = true;
    }
  }

  getCurrentTeam() {
    return this.team;
  }

  isDraftFinished() {
    return this.draftComplete;
  }
}
