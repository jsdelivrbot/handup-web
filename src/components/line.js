import React from 'react';

import LineSpot from './line_spot';
import MainButton from './main_button';

export default function Line({ room }) {
  return (
    <div>
      <div className="m-b-s">
        <MainButton room={room} />
      </div>

      <ul className="list-group">
        {renderLineSpots()}
      </ul>
    </div>
  );

  function renderLineSpots() {
    return room.lineSpots.edges.map(function (lineSpot) {
      return (
        <li className="list-group-item" key={lineSpot.node.id}>
          <LineSpot lineSpot={lineSpot.node} />
        </li>
      );
    });
  }
};
