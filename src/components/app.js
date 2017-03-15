import React from 'react';
import { Route } from 'react-router-dom';

import NewRoom from './new_room';
import ShowRoom from './show_room';
import GoogleLogin from './google_login';

export default function App() {
  return (
    <div>
      <Route path="/" component={NewRoom} exact={true} />
      <Route path="/room/:name" component={ShowRoom} exact={true} />
      <Route path="/login/google" component={GoogleLogin} exact={true} />
    </div>
  );
}
