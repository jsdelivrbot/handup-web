import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import reducers from './reducers';
import Routes from './routes';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <ApolloProvider store={createStoreWithMiddleware(reducers)} client={client}>
    <Router>
      <Routes />
    </Router>
  </Provider>
  , document.querySelector('.container'));
