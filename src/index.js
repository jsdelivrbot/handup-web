import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { persistStore, autoRehydrate } from 'redux-persist'
import { ApolloProvider } from 'react-apollo';

import apolloClient from './apollo/client';
import reducers from './reducers';
import App from './components/app';

const combinedReducers = combineReducers(_.merge(reducers, { apollo: apolloClient.reducer() }));

const store = createStore(
  combinedReducers,
  {},
  compose(
    applyMiddleware(apolloClient.middleware()),
    autoRehydrate()
  )
);

persistStore(store, { whitelist: ['currentUser'], debounce: 0 });

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </ApolloProvider>
  , document.querySelector('#root')
);
