import React from 'react';
import classnames from 'classnames';

import TimeAgo from './time_ago';
import TimeCounter from './time_counter';

export default function LineSpot({ currentUser, lineSpot, index }) {
  return (
    <div className={`flex flex-row flex-align-items-center m-t-s m-b-s ${ isCurrentUser() ? 'bold' : '' }`}>
      <div className="center-text" style={{ flex: '2 0 50px' }}>
        {renderIndex()}
      </div>
      <div className="p-s" style={{ flex: '0 0 96px', padding: '10px' }}>
        <img className="circle" src={lineSpot.user.avatarImageUrl} style={{ width: '70px' }} />
      </div>
      <div className="center-text" style={{ flex: '3 1 300px', fontSize: '26px' }}>
        {lineSpot.user.name}
      </div>
      <div className="center-text" style={{ flex: '1 0 50px', fontSize: '16px' }}>
        {renderTime()}
      </div>
    </div>
  );

  function renderTime() {
    if (index == 0) {
      if (lineSpot.turnStartedAt) {
        return <TimeCounter startedAt={lineSpot.turnStartedAt} />;
      }
    } else {
      return <TimeAgo time={lineSpot.createdAt} />;
    }
  }

  function renderIndex() {
    if (index == 0) {
      if (isCurrentUser()) {
        return <div style={{ fontSize: '16px' }}>It's your turn!</div>;
      } else {
        return <div style={{ fontSize: '16px' }}>Current turn</div>;
      }
    } else {
      return <div style={{ fontSize: '26px' }}>#{index}</div>;
    }
  }

  function isCurrentUser() {
    return currentUser && currentUser.id == lineSpot.user.id;
  }
};
