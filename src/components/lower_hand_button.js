import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { SetIsDeletingLineSpot } from '../actions';

function LowerHandButton({ roomId, userLineSpot, isUserTurn, deleteLineSpotMutation, isDeletingLineSpot, SetIsDeletingLineSpot }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick} disabled={isDeletingLineSpot}>
      {buttonText()}
    </button>
  );

  function buttonText() {
    return isUserTurn ? "I'm done!" : 'Lower hand';
  }

  function onClick() {
    SetIsDeletingLineSpot(true);
    const input = { id: userLineSpot.id };
    deleteLineSpotMutation({ variables: { input } })
      .then(() => SetIsDeletingLineSpot(false));
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

const LowerHandButtonWithData = graphql(deleteLineSpotMutation, { name: 'deleteLineSpotMutation' })(LowerHandButton);

function mapStateToProps({ isDeletingLineSpot }) {
  return { isDeletingLineSpot };
}

export default connect(mapStateToProps, { SetIsDeletingLineSpot })(LowerHandButtonWithData)
