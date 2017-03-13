import ApolloClient, { createNetworkInterface } from 'apollo-client';
import config from './config';

const networkInterface = createNetworkInterface({
  uri: config.scapholdUrl,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const localTokenValue = localStorage.getItem('reduxPersist:userToken');
    if (localTokenValue) {
      req.options.headers.Authorization = `Bearer ${localTokenValue}`;
    }
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });

export default client;
