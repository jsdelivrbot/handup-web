import React from 'react';
import { gql, graphql } from 'react-apollo';

function LowerHandButton({ roomId, userId, userLineSpot, deleteLineSpotMutation }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick}>Lower hand</button>
  );

  function onClick() {
    const input = { id: userLineSpot.id };
    deleteLineSpotMutation({ variables: { input } });
  }
};

const deleteLineSpotMutation = gql`
  mutation deleteLineSpot($input: DeleteLineSpotInput!) {
    deleteLineSpot(input: $input) {
      changedLineSpot {
        id
      }
    }
  }
`;

export default graphql(deleteLineSpotMutation, { name: 'deleteLineSpotMutation' })(LowerHandButton);
