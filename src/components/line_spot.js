import React from 'react';

export default function LineSpot({ lineSpot, position }) {
  return (
    <div>
      {position}
      <img src={lineSpot.user.avatarImageUrl} />
      {lineSpot.user.name}
    </div>
  );
};
