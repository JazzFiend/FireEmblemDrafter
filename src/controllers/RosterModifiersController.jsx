import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RosterModifiers from '../view/RosterModifiers';

class RosterModifiersController extends PureComponent {
  static addDisables(disabledList, fullListKeyed) {
    const keyedWithDisabled = fullListKeyed.map((keyedElement) => {
      if (disabledList.includes(keyedElement.label)) {
        const disabledItem = {
          label: keyedElement.label,
          value: keyedElement.value,
          isDisabled: true,
        };
        return disabledItem;
      }
      return keyedElement;
    });
    return keyedWithDisabled;
  }

  static keyList(list) {
    return list.map((element, index) => ({
      value: index,
      label: element,
    }));
  }

  static populateDefaultValues(defaultStringList, keyedListWithDisables) {
    return defaultStringList.map(
      (itemString) => keyedListWithDisables.find(
        (requiredOption) => itemString === requiredOption.label,
      ),
    );
  }

  showRosterOptions() {
    const { draftInProgress, allCharacters } = this.props;
    return (!draftInProgress && allCharacters.length > 0);
  }

  render() {
    const {
      restrictedCharacters,
      requiredCharacters,
      handleRequiredUnitSelector,
      handleRestrictedUnitSelector,
      allCharacters,
      draftInProgress,
    } = this.props;

    const fullListKeyed = RosterModifiersController.keyList(allCharacters);
    const restrictedOptionsWithDisables = RosterModifiersController.addDisables(requiredCharacters, fullListKeyed);
    const requiredOptionsWithDisables = RosterModifiersController.addDisables(restrictedCharacters, fullListKeyed);
    const requiredDefaults = RosterModifiersController.populateDefaultValues(
      requiredCharacters, requiredOptionsWithDisables,
    );
    const restrictedDefaults = RosterModifiersController.populateDefaultValues(
      restrictedCharacters, restrictedOptionsWithDisables,
    );

    const showRosterOptions = this.showRosterOptions();

    return (
      <div>
        <RosterModifiers
          testId="required"
          placeholderText="Required Units"
          defaultValue={requiredDefaults}
          selected={requiredCharacters}
          optionsWithDisables={requiredOptionsWithDisables}
          onChangeHandler={handleRequiredUnitSelector}
          showRosterOptions={showRosterOptions}
          showRosterOptionsLists={draftInProgress}
        />

        <RosterModifiers
          testId="restricted"
          placeholderText="Restricted Units"
          defaultValue={restrictedDefaults}
          selected={restrictedCharacters}
          optionsWithDisables={restrictedOptionsWithDisables}
          onChangeHandler={handleRestrictedUnitSelector}
          showRosterOptions={showRosterOptions}
          showRosterOptionsLists={draftInProgress}
        />
      </div>
    );
  }
}

RosterModifiersController.propTypes = {
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCharacters: PropTypes.arrayOf(PropTypes.string),
  handleRestrictedUnitSelector: PropTypes.func.isRequired,
  handleRequiredUnitSelector: PropTypes.func.isRequired,
  draftInProgress: PropTypes.bool.isRequired,
};

RosterModifiersController.defaultProps = {
  allCharacters: [],
};

export default RosterModifiersController;
