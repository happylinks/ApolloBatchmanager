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
        deleteAsset(input: $input) {
            clientMutationId
            asset {
              async
            }
        }
    }
`;

const batchQuery = new BatchQuery({
    query: deleteAssetQuery,
    variables: {
        id:  "cj0fj68p8dp4a013283j10vpl",
    },
});

const batchQuery2 = new BatchQuery({
    query: deleteAssetQuery,
    variables: {
        id: "cj0fj7mwfdpi10132zbva4mv3",
    },
});

const batch = new Batch({
    queries: [batchQuery, batchQuery2],
    name: 'deleteAssets',
});

batchManager.add(batch);

batchManager.startAll();

console.log(batchManager);

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
