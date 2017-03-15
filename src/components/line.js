import React from 'react';

import LineSpot from './line_spot';
import MainButton from './main_button';

export default function Line({ room }) {
  return (
    <div>
      <MainButton room={room} />

      <ul>
        {renderLineSpots()}
      </ul>
    </div>
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
