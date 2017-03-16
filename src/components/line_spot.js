import React from 'react';

export default function LineSpot({ lineSpot, index }) {
  return (
    <div className="flex flex-row flex-align-items-center m-t-s m-b-s">
      <div className="center-text" style={{ flex: '1 0 50px' }}>
        {renderIndex()}
      </div>
      <div style={{ flex: '0 0 96px' }}>
        <img className="circle" src={lineSpot.user.avatarImageUrl} />
      </div>
      <div className="flex-full-width center-text" style={{ flex: '3 1 300px', fontSize: '26px' }}>
        {lineSpot.user.name}
      </div>
    </div>
  );

  function renderIndex() {
    if (index == 0) {
      return <div style={{fontSize: '16px'}}>Current turn</div>;
    } else {
      return <div style={{fontSize: '26px'}}>#{index}</div>;
    }
  }
};
