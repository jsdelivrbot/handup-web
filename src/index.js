import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { persistStore, autoRehydrate } from 'redux-persist'
import { ApolloProvider } from 'react-apollo';

import client from './apollo';
import reducers from './reducers';
import App from './components/app';

const combinedReducers = combineReducers(_.merge(reducers, { apollo: client.reducer() }));

const store = createStore(
  combinedReducers,
  {},
  compose(
    applyMiddleware(client.middleware()),
    autoRehydrate()
  )
);

persistStore(store, { whitelist: ['userId', 'userToken'] });

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </ApolloProvider>
  , document.querySelector('#root'));
