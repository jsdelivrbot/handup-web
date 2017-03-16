import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import RaiseHandButton from './raise_hand_button';
import LowerHandButton from './lower_hand_button';
import LoginButton from './login_button';

function MainButton({ userId, user, room }) {
  if (!room) {
    return <div>Loading ...</div>;
  }

  if (userId) {
    if (user) {
      const userLineSpot = _.find(room.lineSpots.edges, { node: { user: { id: user.id } } });
      if (userLineSpot) {
        const isUserTurn = room.lineSpots.edges[0] == userLineSpot;
        return <LowerHandButton roomId={room.id} userId={user.id} userLineSpot={userLineSpot.node} isUserTurn={isUserTurn} />;
      } else {
        return <RaiseHandButton roomId={room.id} userId={user.id} />;
      }
    } else {
      return <div>Loading ...</div>;
    }
  } else {
    return <LoginButton />;
  }
}

function mapStateToProps({ userId }) {
  return { userId };
}

export default connect(mapStateToProps)(MainButton);
