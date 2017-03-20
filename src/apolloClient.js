import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const networkInterface = createBatchingNetworkInterface({
    uri: 'https://api.graph.cool/relay/v1/cito96q7s0tx50168trhm8tni',
    batchInterval: 10,
});

const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/cito96q7s0tx50168trhm8tni`, {
    reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
});

export default client;
