class Batch {
    constructor({ queries, name }) {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        queries.forEach((query, i) => {
            query.setName(`${name}_${i}`);
        });
        this.queries = queries;
    }
    start() {
        const promises = this.queries.map(query => query.start());
        Promise.all(promises).then(() => {
            this.resolve();
        });

        return this.promise;
    }
}

export default Batch;
