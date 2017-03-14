import React from 'react';
import { gql, graphql } from 'react-apollo';

function RaiseHandButton({ userId, roomId, createLineSpotMutation }) {
  return (
    <button onClick={onClick}>Raise hand</button>
  );

  function onClick() {
    const input = { roomId, userId };
    createLineSpotMutation({ variables: { input }});
  }
};

export default graphql(gql`
  mutation createLineSpot($input: CreateLineSpotInput!) {
    createLineSpot(input: $input){
      changedLineSpot {
        id
      }
    }
  }
`, { name: 'createLineSpotMutation' })(RaiseHandButton);
