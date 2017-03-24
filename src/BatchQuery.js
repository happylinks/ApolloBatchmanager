import apolloClient from './apolloClient';

class BatchQuery {
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
            const clientMutationId = result.clientMutationId;

            const subscription = apolloClient.subscribe({
                query: this.subscription,
            })
            subscription.subscribe({
                next(result) {
                    subscription.unsubscribe();
                    this.result = result;
                    this.resolve(result);
                }
            });
        })
        .catch((error) => {
            this.error = error;
            this.reject(error);
        });

        return this.promise;
    }
}

export default BatchQuery;
