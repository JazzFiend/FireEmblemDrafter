import ArrayHelper from './helpers/ArrayHelper';

export default class DraftRoster {
  constructor(draftOptions, exclusives = [[]]) {
    this.roster = draftOptions.roster.slice();
    this.exclusives = exclusives;
  }

  getRosterLength() {
    return this.roster.length;
  }

  getRoster() {
    return this.roster.slice(0);
  }

  containsItem(item) {
    return this.roster.includes(item);
  }

  removeItemFromRoster(item) {
    this.roster = ArrayHelper.removeFromArray(this.roster, item);
  }

  removeExclusives(selectedItem) {
    this.exclusives.forEach((exclusiveGroup) => {
      if (exclusiveGroup.includes(selectedItem)) {
        this._removeNoLongerApplicable(exclusiveGroup, selectedItem);
      }
    });
  }

  _removeNoLongerApplicable(exclusiveGroup, exclusiveItem) {
    const noLongerApplicableItems = ArrayHelper.removeFromArray(exclusiveGroup, exclusiveItem);
    noLongerApplicableItems.forEach((toRemove) => {
      this.roster = ArrayHelper.removeFromArray(this.roster, toRemove);
    });
  }
}
