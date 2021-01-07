import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FireEmblemDrafter } from '../FireEmblemDrafter';
import gameInfo from '../../../reference/gameInfo';

jest.mock('../../GameSelector', () => () => 'GameSelector');
jest.mock('../../DraftController', () => () => 'DraftController');

afterEach(cleanup);

test('renders and matches snapshot', () => {
  const { asFragment } = render(
    <FireEmblemDrafter
      teamSize={2}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
