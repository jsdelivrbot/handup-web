import _ from 'lodash';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client as SubscriptionClient } from 'subscriptions-transport-ws';

import config from '../config';
import addGraphQLSubscriptions from './add_graphql_subscriptions';
import handleUserToken from './handle_user_token';
import handleErrors from './handle_errors';

const networkInterface = createNetworkInterface({
  uri: config.scapholdHttpsUrl,
});

networkInterface.use([handleUserToken]);
networkInterface.useAfter([handleErrors]);

const wsClient = new SubscriptionClient(config.scapholdWssUrl, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: (object) => object.id,
  initialState: {}
});

export default client;
