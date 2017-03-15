import React from 'react';

import LineSpot from './line_spot';

export default function Line({ room }) {
  return (
    <ul>
      {renderLineSpots()}
    </ul>
  );

  function renderLineSpots() {
    return room.lineSpots.edges.map(function (lineSpot) {
      return (
        <li key={lineSpot.node.id}>
          <LineSpot lineSpot={lineSpot.node} />
        </li>
      );
    });
  }
};
