import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { SetIsCreatingLineSpot } from '../actions';

function RaiseHandButton({ userId, roomId, createLineSpotMutation, isCreatingLineSpot, SetIsCreatingLineSpot }) {
  return (
    <button className="btn btn-xl btn-primary full-width" onClick={onClick} disabled={isCreatingLineSpot}>
      Raise hand
    </button>
  );

  function onClick() {
    SetIsCreatingLineSpot(true);
    createLineSpotMutation({ variables: { input: { roomId, userId } }})
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

function mapStateToProps({ isCreatingLineSpot }) {
  return { isCreatingLineSpot };
}

export default connect(mapStateToProps, { SetIsCreatingLineSpot })(RaiseHandButtonWithData)
