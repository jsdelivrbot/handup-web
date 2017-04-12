import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { SetIsCreatingLineSpot } from '../actions';

function RaiseHandButton({ currentUserId, room, createLineSpotMutation, isCreatingLineSpot, SetIsCreatingLineSpot }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick} disabled={isCreatingLineSpot}>
      <i className="fa fa-hand-paper-o  m-r-s" /> Raise hand
    </button>
  );

  function onClick() {
    SetIsCreatingLineSpot(true);

    const input = {
      userId: currentUserId,
      roomId: room.id,
      turnStartedAt :isLineEmpty() ? new Date() : null
    };

    createLineSpotMutation({ variables: { input }})
      .then(() => SetIsCreatingLineSpot(false));
  }

  function isLineEmpty() {
    return room.lineSpots.edges.length == 0;
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

const RaiseHandButtonWithData = compose(
  graphql(createLineSpotMutation, { name: 'createLineSpotMutation' })
)(RaiseHandButton);

function mapStateToProps({ currentUser, isCreatingLineSpot }) {
  return { currentUserId: currentUser.id, isCreatingLineSpot };
}

export default connect(mapStateToProps, { SetIsCreatingLineSpot })(RaiseHandButtonWithData)
