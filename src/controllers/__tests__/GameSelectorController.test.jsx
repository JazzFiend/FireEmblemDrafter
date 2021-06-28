import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import GameSelectorController from '../GameSelectorController';
import TestUtil from '../../testHelpers/TestUtil';

afterEach(cleanup);

const gameInfo = [
  {
    id: 0,
    title: 'title1',
    playableCharacters: ['char1', 'char2', 'char3'],
  },
  {
    id: 1,
    title: 'title2',
    playableCharacters: ['char4', 'char5'],
  },
];

test('renders game selection dropdown when draft is not in progress', () => {
  const store = TestUtil.createDraftInProgressMockStore(false);
  const { asFragment } = render(
    <Provider store={store}>
      <GameSelectorController
        gameInfo={gameInfo}
        handleGameSelector={jest.fn()}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders nothing when draft is in progress', () => {
  const store = TestUtil.createDraftInProgressMockStore(true);

  const { asFragment } = render(
    <Provider store={store}>
      <GameSelectorController
        gameInfo={gameInfo}
        handleGameSelector={jest.fn()}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('should populate game title after it has been clicked', () => {
  const dummy = jest.fn();
  const store = TestUtil.createDraftInProgressMockStore(false);

  const { container, asFragment } = render(
    <Provider store={store}>
      <GameSelectorController
        gameInfo={gameInfo}
        handleGameSelector={dummy}
      />
    </Provider>,
  );

  userEvent.click(container.querySelector('.game-selector__control'));
  userEvent.click(container.querySelectorAll('.game-selector__option')[0]);

  expect(dummy).toHaveBeenCalled();
  expect(asFragment()).toMatchSnapshot();
});
