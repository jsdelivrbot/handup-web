import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { SetReturnTo } from '../actions';

function LoginButton({ history, SetReturnTo }) {
  return (
    <button onClick={onClick}>Enter</button>
  );

  function onClick() {
    SetReturnTo(history.location.pathname);
    history.push('/login/google');
  }
};

export default connect(null, { SetReturnTo })(withRouter(LoginButton));
