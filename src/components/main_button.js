import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import RaiseHandButton from './raise_hand_button';
import LowerHandButton from './lower_hand_button';
import LoginButton from './login_button';

function MainButton({ currentUserId, currentUser, room }) {
  if (!room) {
    return renderLoading();
  }

  if (currentUserId) {
    if (currentUser) {
      const userLineSpot = _.find(room.lineSpots.edges, { node: { user: { id: currentUser.id } } });
      if (userLineSpot) {
        const isUserTurn = room.lineSpots.edges[0] == userLineSpot;
        return <LowerHandButton roomId={room.id} userLineSpot={userLineSpot.node} isUserTurn={isUserTurn} />;
      } else {
        return <RaiseHandButton roomId={room.id} />;
      }
    } else {
      return renderLoading();
    }
  } else {
    return <LoginButton />;
  }

  function renderLoading() {
    return <button className="btn btn-xl btn-primary full-width">Loading ...</button>
  }
}

function mapStateToProps({ currentUserId }) {
  return { currentUserId };
}

export default connect(mapStateToProps)(MainButton);
