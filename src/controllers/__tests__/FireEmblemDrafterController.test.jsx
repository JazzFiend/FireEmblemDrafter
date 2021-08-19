import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import MockStoreBuilder from '../../testHelpers/MockStoreBuilder';
import FireEmblemDrafterController from '../FireEmblemDrafterController';
import gameInfo from '../../reference/gameInfo';

afterEach(cleanup);

test('renders display in initial state', () => {
  const store = new MockStoreBuilder().build();
  const { asFragment } = render(
    <Provider store={store}>
      <FireEmblemDrafterController
        isRandom={false}
        gameInfo={gameInfo}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
