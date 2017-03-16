import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function RaiseHandButton({ userId, roomId, createLineSpotMutation }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick}>Raise hand</button>
  );

  function onClick() {
    const input = { roomId, userId };
    createLineSpotMutation({ variables: { input }});
  }
};

const createLineSpotMutation = gql`
  mutation createLineSpot($input: CreateLineSpotInput!) {
    createLineSpot(input: $input){
      changedLineSpot {
        id
      }
    }
  }
`;

export default graphql(createLineSpotMutation, { name: 'createLineSpotMutation' })(RaiseHandButton);
