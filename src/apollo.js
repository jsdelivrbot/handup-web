import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client as SubscriptionClient } from 'subscriptions-transport-ws';
import { print } from 'graphql-tag/printer';

import config from './config';

const networkInterface = createNetworkInterface({
  uri: config.scapholdHttpsUrl,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const localTokenValue = localStorage.getItem('reduxPersist:userToken');
    if (localTokenValue) {
      const token = localTokenValue.slice(1, localTokenValue.length - 1);
      req.options.headers.Authorization = `Bearer ${token}`;
    }
    next();
  },
}]);

const wsClient = new SubscriptionClient(config.scapholdWssUrl, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({ networkInterface: networkInterfaceWithSubscriptions, initialState: {} });

export default client;

function addGraphQLSubscriptions(networkInterface, wsClient) {
  return Object.assign(networkInterface, {
    subscribe(request, handler) {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id) {
      wsClient.unsubscribe(id);
    }
  });
}
