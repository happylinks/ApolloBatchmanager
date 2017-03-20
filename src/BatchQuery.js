import apolloClient from './apolloClient';

class BatchQuery {
    async = null;
    result = null;
    error = null;
    name = null;
    promise = null;

    constructor({ query, variables }) {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.query = query;
        this.variables = variables;
    }

    setName(name) {
        this.name = name;
    }

    // Move to Batch, make the query there and merge them.
    start() {
        apolloClient.mutate({
            mutation: this.query,
            variables: {
                input: {
                    ...this.variables,
                    clientMutationId: this.name,
                }
            }
        })
        .then((result) => {
            // asset should be out of here.
            this.async = result.asset.async;
            this.result = result;
            this.resolve(result);
        })
        .catch((error) => {
            this.error = error;
            this.reject(error);
        });
    }
}

export default BatchQuery;
