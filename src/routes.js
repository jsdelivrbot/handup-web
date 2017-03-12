import React from 'react';
import { IndexRoute } from 'react-router';
import { Route } from 'react-router-dom';

import NewRoom from './components/new_room';
import ShowRoom from './components/show_room';

export default function Routes() {
  return (
    <div>
      <Route path="/" component={NewRoom} exact={true} />
      <Route path="/room/:name" component={ShowRoom} />
    </div>
  );
};
