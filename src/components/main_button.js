import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import RaiseHandButton from './raise_hand_button';
import LowerHandButton from './lower_hand_button';
import LoginButton from './login_button';

function MainButton({ room, userQuery }) {
  if (!room) {
    return <div>Loading ...</div>;
  }

  if (userQuery) {
    if (userQuery.loading) {
      return <div>Loading ...</div>;
    } else {
      const userLineSpot = _.find(room.lineSpots.edges, { node: { user: { id: userQuery.getUser.id } } });
      if (userLineSpot) {
        const isUserTurn = room.lineSpots.edges[0] == userLineSpot;
        return <LowerHandButton roomId={room.id} userId={userQuery.getUser.id} userLineSpot={userLineSpot.node} isUserTurn={isUserTurn} />;
      } else {
        return <RaiseHandButton roomId={room.id} userId={userQuery.getUser.id} />;
      }
    }
  } else {
    return <LoginButton />;
  }
}

const getUserQuery = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      avatarImageUrl
    }
  }
`

const getUserOptions = ({ userId }) => ({ variables: { id: userId } });

const MainButtonWithData = compose(
  graphql(getUserQuery, { name: 'userQuery', options: getUserOptions, skip: ({ userId }) => !userId })
)(MainButton);

function mapStateToProps({ userId }) {
  return { userId };
}

export default connect(mapStateToProps)(MainButtonWithData);
