import {
  ApolloClient, HttpLink, InMemoryCache, split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
