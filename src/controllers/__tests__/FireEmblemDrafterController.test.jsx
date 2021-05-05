import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FireEmblemDrafterController } from '../FireEmblemDrafterController';
import gameInfo from '../../reference/gameInfo';

afterEach(cleanup);

test('renders display in initial state', () => {
  const { asFragment } = render(
    <FireEmblemDrafterController
      teamSize={2}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
