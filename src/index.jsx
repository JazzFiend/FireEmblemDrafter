import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage, DraftPage } from './App';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/draft" component={DraftPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
