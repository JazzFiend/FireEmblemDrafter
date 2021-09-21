// **** Maybe this should be named DraftOptions?
export default class DraftOptions {
  constructor(roster, restricted = [], required = []) {
    DraftOptions._validateInputs(roster, restricted, required);
    this.roster = DraftOptions._setupRoster(roster, restricted, required);
    this.required = DraftOptions._parseRequired(roster, required);
  }

  static _validateInputs(roster, restricted, required) {
    if (!roster.length) {
      throw new TypeError('Roster is empty.');
    }
    this._verifyValidRosterValues(roster, restricted);
    this._verifyValidRosterValues(roster, required);
  }

  static _verifyValidRosterValues(roster, listToCheck) {
    listToCheck.forEach((element) => {
      if (!roster.includes(element)) {
        throw new TypeError(`Incorrect value seen in restriction list: ${element}`);
      }
    });
  }

  static _setupRoster(roster, restricted, required) {
    let officialRoster = roster.slice();
    officialRoster = officialRoster.filter(
      (entry) => !restricted.includes(entry),
    );
    officialRoster = officialRoster.filter(
      (entry) => !required.includes(entry),
    );
    return officialRoster;
  }

  // **** What's the point of this?
  static _parseRequired(roster, required) {
    return required.slice();
  }
}
