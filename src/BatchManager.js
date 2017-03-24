import apolloClient from './apolloClient';
import gql from 'graphql-tag';

class BatchManager {
    batches = [];

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

