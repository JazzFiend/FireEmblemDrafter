import React from 'react';
import ReactDOM from 'react-dom';
import { FireEmblemDrafterController } from './controllers/FireEmblemDrafterController';
import gameInfo from './reference/gameInfo';

ReactDOM.render(
  <FireEmblemDrafterController
    isRandom
    gameInfo={gameInfo}
  />, document.getElementById('root'),
);
