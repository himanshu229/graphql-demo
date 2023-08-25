// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your API URL
  cache: new InMemoryCache(),
});

export default client;
