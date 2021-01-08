import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameSelector from '../GameSelector';
import gameInfo from '../../reference/gameInfo';

jest.mock('../Dropdown/Dropdown', () => () => 'Dropdown');

afterEach(cleanup);

test('renders game selection dropdown when draft is in progress', () => {
  const { asFragment } = render(
    <GameSelector
      draftInProgress={false}
      gameInfo={gameInfo}
      handleGameSelector={jest.fn()}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders nothing when draft is not in progress', () => {
  const { asFragment } = render(
    <GameSelector
      draftInProgress={true}
      gameInfo={gameInfo}
      handleGameSelector={jest.fn()}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
