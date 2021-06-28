import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FireEmblemDrafterController from './controllers/FireEmblemDrafterController';
import gameInfo from './reference/gameInfo';
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <FireEmblemDrafterController
      randomizePicks
      gameInfo={gameInfo}
    />
  </Provider>,
  document.getElementById('root'),
);
