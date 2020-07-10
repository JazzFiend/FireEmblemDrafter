import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RosterOptionsController from '../RosterOptionsController';

test('should not render when a set of characters is not loaded', () => {
  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      allCharacters={[]}
      handleRestrictedUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
});

test('should render when a set of characters is loaded', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('Add Restricted...');
});

test('should hide dropdown and show restricted units when draft has started', () => {
  const restrictedCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={restrictedCharacters}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      draftInProgress={true}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
  const restrictedList = getByTestId('restricted-list');
  expect(restrictedList).toHaveTextContent('Restricted Units: y z');
});

test('should run passed function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const { getByTestId, getAllByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={(id) => testClickHandler(id)}
      draftInProgress={false}
    />,
  );

  fireEvent.click(getByTestId('dropdown'));
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('Add Restricted...');
  expect(testClickHandler).toHaveBeenCalledWith('u');
});
