import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { FireEmblemDrafter } from '../FireEmblemDrafter/FireEmblemDrafter';
import gameInfo from '../../reference/gameInfo';

afterEach(cleanup);

function selectItemInDropdown(container, dropdownClass, optionNumber) {
  userEvent.click(container.querySelector(`${dropdownClass}__control`));
  userEvent.click(container.querySelectorAll(`${dropdownClass}__option`)[optionNumber]);
}

function selectFirstGame(container) {
  selectItemInDropdown(container, '.game-selector', 0);
}

function selectFirstRestricted(container) {
  selectItemInDropdown(container, '.restricted-selector', 0);
}

function selectFirstRequired(container) {
  selectItemInDropdown(container, '.required-selector', 0);
}

test('should be able to run a complete draft', () => {
  const { container, getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={3}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  selectFirstGame(container, getByTestId);

  selectFirstRequired(container);

  selectFirstRestricted(container);

  userEvent.click(getByTestId('start-draft-button'));
  userEvent.click(getAllByTestId('pick-button')[0]);
  userEvent.click(getAllByTestId('pick-button')[0]);
  expect(getByTestId('team-list')).toHaveTextContent('Eirika Franz Ross');
  expect(getByTestId('start-draft-button')).toHaveTextContent('Start Draft!');
});
