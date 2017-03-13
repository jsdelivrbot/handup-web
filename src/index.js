import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { persistStore, autoRehydrate } from 'redux-persist'
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

import reducers from './reducers';
import Routes from './routes';

const store = createStore(reducers, undefined, compose(autoRehydrate()));

persistStore(store, { whitelist: ['userToken'] });

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
  , document.querySelector('#root'));
