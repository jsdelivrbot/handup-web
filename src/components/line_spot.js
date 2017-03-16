import React from 'react';

export default function LineSpot({ lineSpot, index }) {
  return (
    <div>
      {renderIndex()}
      <img src={lineSpot.user.avatarImageUrl} />
      {lineSpot.user.name}
    </div>
  );

  function renderIndex() {
    if (index == 0) {
      return '';
    } else {
      return `#${index}`;
    }
  }
};
