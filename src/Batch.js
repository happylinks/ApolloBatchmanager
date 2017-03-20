class Batch {
    constructor({ queries, name }) {
        queries.forEach((query, i) => {
            query.setName(`${name}_${i}`);
        });
        this.queries = queries;
    }
    start() {
        this.queries.forEach(query => {
            query.start();
        });
    }
}

export default Batch;
