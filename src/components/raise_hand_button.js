import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { SetIsCreatingLineSpot } from '../actions';

function RaiseHandButton({ currentUserId, roomId, createLineSpotMutation, isCreatingLineSpot, SetIsCreatingLineSpot }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick} disabled={isCreatingLineSpot}>
      Raise hand
    </button>
  );

  function onClick() {
    SetIsCreatingLineSpot(true);
    const input = { userId: currentUserId, roomId };
    createLineSpotMutation({ variables: { input }})
      .then(() => SetIsCreatingLineSpot(false));
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

const RaiseHandButtonWithData = graphql(createLineSpotMutation, { name: 'createLineSpotMutation' })(RaiseHandButton);

function mapStateToProps({ currentUserId, isCreatingLineSpot }) {
  return { currentUserId, isCreatingLineSpot };
}

export default connect(mapStateToProps, { SetIsCreatingLineSpot })(RaiseHandButtonWithData)
