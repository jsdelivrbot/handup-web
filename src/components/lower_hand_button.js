import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { SetIsDeletingLineSpot } from '../actions';

function LowerHandButton({ roomId, userLineSpot, isUserTurn, nextLineSpot,
  deleteLineSpotMutation, updateLineSpotMutation, isDeletingLineSpot, SetIsDeletingLineSpot }) {

  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick} disabled={isDeletingLineSpot}>
      <i className="fa fa-hand-rock-o m-r-s" /> {buttonText()}
    </button>
  );

  function buttonText() {
    return isUserTurn ? "I'm done!" : 'Lower hand';
  }

  function onClick() {
    SetIsDeletingLineSpot(true);

    deleteLineSpotMutation({ variables: { input: { id: userLineSpot.id } } })
      .then(() => {
        SetIsDeletingLineSpot(false);

        if (isUserTurn && nextLineSpot) {
          updateLineSpotMutation({ variables: { input: { id: nextLineSpot.id, turnStartedAt: new Date() } } });
        }
      });
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

const updateLineSpotMutation = gql`
  mutation updateLineSpot($input: UpdateLineSpotInput!) {
    updateLineSpot(input: $input) {
      changedLineSpot {
        id
      }
    }
  }
`;

const LowerHandButtonWithData = compose(
  graphql(deleteLineSpotMutation, { name: 'deleteLineSpotMutation' }),
  graphql(updateLineSpotMutation, { name: 'updateLineSpotMutation' })
)(LowerHandButton);

function mapStateToProps({ isDeletingLineSpot }) {
  return { isDeletingLineSpot };
}

export default connect(mapStateToProps, { SetIsDeletingLineSpot })(LowerHandButtonWithData)
