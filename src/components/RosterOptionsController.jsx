import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dropdown from './Dropdown/Dropdown';

class RosterOptionsController extends PureComponent {
  static displayList(list, label) {
    if (!list.length) {
      return '';
    }
    let listDisplayFriendly = label;

    _.forEach(list, (value) => {
      listDisplayFriendly = `${listDisplayFriendly + value}\n`;
    });
    return listDisplayFriendly;
  }

  static _keyList(list) {
    const keyedList = [];
    _.forEach(list, (element, index) => {
      keyedList.push(
        {
          id: index,
          title: element,
        },
      );
    });
    return keyedList;
  }

  static filterRoster(allCharacters, restrictedCharacters, requiredCharacters) {
    return allCharacters.filter(
      (character) => (!restrictedCharacters.includes(character)),
    ).filter(
      (character) => (!requiredCharacters.includes(character)),
    );
  }

  // TODO: These two functions are nearly identical, but its not a typical refactor. I think I need to create a
  // UnitDropdown class or something. Going to save this for its own task.
  showRequiredDropdown(currentRosterKeyed) {
    const { draftInProgress, allCharacters, handleRequiredUnitSelector } = this.props;
    return (
      <div data-testid="required-drop-down">
        {
      (!draftInProgress && allCharacters.length > 0)
      && (
      <Dropdown
        defaultText="Add Required..."
        dropdownItems={currentRosterKeyed}
        onClick={(characterId) => handleRequiredUnitSelector(currentRosterKeyed.find(
          (element) => element.id === characterId,
        ).title)}
      />
      )
    }
      </div>
    );
  }

  showRestrictedDropdown(currentRosterKeyed) {
    const { draftInProgress, allCharacters, handleRestrictedUnitSelector } = this.props;
    return (
      <div data-testid="restricted-drop-down">
        {
      (!draftInProgress && allCharacters.length > 0)
      && (
      <Dropdown
        defaultText="Add Restricted..."
        dropdownItems={currentRosterKeyed}
        onClick={(characterId) => handleRestrictedUnitSelector(currentRosterKeyed.find(
          (element) => element.id === characterId,
        ).title)}
      />
      )
    }
      </div>
    );
  }

  render() {
    const { restrictedCharacters, requiredCharacters, allCharacters } = this.props;
    const filteredRoster = RosterOptionsController.filterRoster(
      allCharacters,
      restrictedCharacters,
      requiredCharacters,
    );
    const currentRosterKeyed = RosterOptionsController._keyList(filteredRoster);

    return (
      <div>
        {this.showRequiredDropdown(currentRosterKeyed)}
        <div data-testid="required-list">
          {RosterOptionsController.displayList(requiredCharacters, 'Required Units: ')}
        </div>
        {this.showRestrictedDropdown(currentRosterKeyed)}
        <div data-testid="restricted-list">
          {RosterOptionsController.displayList(restrictedCharacters, 'Restricted Units: ')}
        </div>
      </div>
    );
  }
}

RosterOptionsController.propTypes = {
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCharacters: PropTypes.arrayOf(PropTypes.string),
  handleRestrictedUnitSelector: PropTypes.func.isRequired,
  handleRequiredUnitSelector: PropTypes.func.isRequired,
  draftInProgress: PropTypes.bool.isRequired,
};

RosterOptionsController.defaultProps = {
  allCharacters: [],
};

export default RosterOptionsController;
