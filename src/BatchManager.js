import apolloClient from './apolloClient';
import gql from 'graphql-tag';

class BatchManager {
    batches = [];

    constructor() {
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        const query = gql`
            query assets {
                viewer {
                    allAssets {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                }
            }
        `;
        const subscription = gql`
            subscription Asset {
                Asset {
                    mutation
                    node {
                        id
                    }
                }
            }
        `;
        const queryHandle = apolloClient.watchQuery({
            query
        });
        queryHandle.subscribe({
            next(queryResult) {
                console.log('hiero');
                console.log(queryResult);
            },
        });
        queryHandle.subscribeToMore({
            document: subscription,
            updateQuery: (prev, { subscriptionData }) => {
                console.log('hiero2');
                console.log(subscriptionData);
                return;
            }
        });
    }

    add(batch) {
        this.batches.push(batch);
    }

    // Test only
    startAll() {
        this.batches.forEach(batch => {
            batch.start();
        });
    }
}

export default BatchManager;

