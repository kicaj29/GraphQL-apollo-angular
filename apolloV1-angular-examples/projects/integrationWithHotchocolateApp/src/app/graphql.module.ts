import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const uri = 'http://localhost:37926'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const ws = new WebSocketLink({
    uri: `ws://localhost:37926`,
    options: {
      reconnect: true
    }
  });
  const http = httpLink.create({
    uri: 'http://localhost:37926'
  });

  // thx to this we can work together with both connection types: http(s) and ws:
  const link = split(({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }, ws, http);

  return {
    link,
    cache: new InMemoryCache(),
  };

  // this can be used when we do not use web sockets:
  /*return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };*/
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
