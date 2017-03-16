import React from 'react';
import { connect } from 'react-redux';

import { SetCurrentUserId, SetCurrentUserToken } from '../actions';

function LogoutButton({ currentUserId, SetCurrentUserId, SetCurrentUserToken }) {
  if (!currentUserId) {
    return null;
  }

  return (
    <button className="btn btn-default faded" onClick={onClick}>
      <i className="fa fa-sign-out" />
    </button>
  );

  function onClick() {
    SetCurrentUserId(null);
    SetCurrentUserToken(null);
  }
}

function mapStateToProps({ currentUserId }) {
  return { currentUserId };
}

export default connect(mapStateToProps, { SetCurrentUserId, SetCurrentUserToken })(LogoutButton);
