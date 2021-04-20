import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import dropdownStyle from '../reference/dropdownStyle';

class RosterOptionsController extends PureComponent {
  static displayList(list, label) {
    if (!list.length) return '';

    return `${label}: ${list.reduce(
      (accumulatedString, next) => `${accumulatedString}\n${next}`,
    )}`;
  }

  static _keyList(list) {
    return list.map((element, index) => ({
      value: index,
      label: element,
    }));
  }

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

  static populateDefaultValues(defaultStringList, keyedListWithDisables) {
    return defaultStringList.map(
      (itemString) => keyedListWithDisables.find(
        (requiredOption) => itemString === requiredOption.label,
      ),
    );
  }

  showDropdown(dropdownOptions) {
    const { draftInProgress, allCharacters } = this.props;
    return (
      <div data-testid={`${dropdownOptions.testId}-drop-down`}>
        {
          (!draftInProgress && allCharacters.length > 0)
          && RosterOptionsController.renderMultiDropdown(
            dropdownOptions,
          )
        }
      </div>
    );
  }

  static renderMultiDropdown(dropdownOptions) {
    return (
      <Select
        isMulti
        className={`${dropdownOptions.testId}-selector`}
        classNamePrefix={`${dropdownOptions.testId}-selector`}
        defaultValue={dropdownOptions.defaultValue}
        options={dropdownOptions.options}
        onChange={(selectedCharacters) => dropdownOptions.onChangeHandler(selectedCharacters.map(
          (element) => element.label,
        ))}
        placeholder={dropdownOptions.placeholderText}
        styles={dropdownStyle}
      />
    );
  }

  showUnitList(testId, list, listTitle) {
    const { draftInProgress } = this.props;
    return (
      <div data-testid={`${testId}-list`}>
        {
          (draftInProgress)
          && RosterOptionsController.displayList(list, listTitle)
        }
      </div>
    );
  }

  render() {
    const {
      restrictedCharacters,
      requiredCharacters,
      allCharacters,
      handleRequiredUnitSelector,
      handleRestrictedUnitSelector,
    } = this.props;

    const fullListKeyed = RosterOptionsController._keyList(allCharacters);
    const requiredOptionsWithDisables = RosterOptionsController.addDisables(restrictedCharacters, fullListKeyed);
    const restrictedOptionsWithDisables = RosterOptionsController.addDisables(requiredCharacters, fullListKeyed);
    const requiredDefaults = RosterOptionsController.populateDefaultValues(
      requiredCharacters, requiredOptionsWithDisables,
    );
    const restrictedDefaults = RosterOptionsController.populateDefaultValues(
      restrictedCharacters, restrictedOptionsWithDisables,
    );

    const requiredDropdownOptions = {
      testId: 'required',
      defaultValue: requiredDefaults,
      options: requiredOptionsWithDisables,
      onChangeHandler: handleRequiredUnitSelector,
      placeholderText: 'Required Units',
    };

    const restrictedDropdownOptions = {
      testId: 'restricted',
      defaultValue: restrictedDefaults,
      options: restrictedOptionsWithDisables,
      onChangeHandler: handleRestrictedUnitSelector,
      placeholderText: 'Restricted Units',
    };

    return (
      <div>
        {this.showDropdown(requiredDropdownOptions)}
        {this.showUnitList(requiredDropdownOptions.testId, requiredCharacters, requiredDropdownOptions.placeholderText)}
        {this.showDropdown(restrictedDropdownOptions)}
        {this.showUnitList(
          restrictedDropdownOptions.testId,
          restrictedCharacters,
          restrictedDropdownOptions.placeholderText,
        )}
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
