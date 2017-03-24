import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BatchManager from './BatchManager';
import Batch from './Batch';
import BatchQuery from './BatchQuery';

import logo from './logo.svg';
import './App.css';

const batchManager = new BatchManager();

const deleteAssetQuery = gql`
    mutation deleteAssetQuery(
        $input: DeleteAssetInput!
    ) {
        deleteAsset(input: $input, async: true) {
            clientMutationId
        }
    }
`;
const deleteAssetSubscription = gql`
    subscription deleteAsset(
        $clientMutationId: ClientMutationID!
    ) {
        deleteAsset(clientMutationId: $clientMutationId) {
            asset {
                id
                name
                extension
            }
        }
    }
`;
const batchQuery = new BatchQuery({
    query: deleteAssetQuery,
    subscription: deleteAssetSubscription,
    variables: {
        id:  "cj0fkn1hk03qx0166shxzybos",
    },
});

const batchQuery2 = new BatchQuery({
    query: deleteAssetQuery,
    subscription: deleteAssetSubscription,
    variables: {
        id: "cj0fkn2lq0drr0119bhdsq5gc",
    },
});

const batch = new Batch({
    queries: [batchQuery, batchQuery2],
    name: 'deleteAssets',
});

batch.start().then(() => {
    console.log('BATCH IS DONE!', batch);
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
