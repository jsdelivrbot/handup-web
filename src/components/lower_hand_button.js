import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function LowerHandButton({ roomId, userId, userLineSpot, isUserTurn, deleteLineSpotMutation }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick}>{buttonText()}</button>
  );

  function buttonText() {
    return isUserTurn ? "I'm done!" : 'Lower hand';
  }

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
