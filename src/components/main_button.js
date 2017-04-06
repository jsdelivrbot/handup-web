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
        return (
          <LowerHandButton
            roomId={room.id}
            userLineSpot={userLineSpot.node}
            isUserTurn={isUserTurn}
            nextLineSpot={room.lineSpots.edges[1] ? room.lineSpots.edges[1].node : null}
          />
        );
      } else {
        return <RaiseHandButton room={room} />;
      }
    } else {
      return renderLoading();
    }
  } else {
    return <LoginButton />;
  }

  function renderLoading() {
    return <button className="btn btn-xl btn-primary full-width">Loading ...</button>;
  }
}

function mapStateToProps({ currentUserId }) {
  return { currentUserId: currentUserId.value };
}

export default connect(mapStateToProps)(MainButton);
