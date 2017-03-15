import React from 'react';

export default function LineSpot({ lineSpot }) {
  return (
    <div>
      <img src={lineSpot.user.avatarImageUrl} /> {lineSpot.user.name}
    </div>
  );
};
