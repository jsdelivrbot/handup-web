import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { SetCurrentUserId, SetCurrentUserToken } from '../actions';

function LogoutButton({ currentUserId, getUserQuery, SetCurrentUserId, SetCurrentUserToken }) {
  if (!currentUserId) {
    return null;
  }

  return (
    <div>
      {renderUserAvatar()}
      <button className="btn btn-default faded" onClick={onClick}>
        <i className="fa fa-sign-out" />
      </button>
    </div>
  );

  function onClick() {
    SetCurrentUserId(null);
    SetCurrentUserToken(null);
  }

  function renderUserAvatar() {
    if (getUserQuery.loading) {
      return;
    }

    return <img className="circle m-r-s" src={getUserQuery.getUser.avatarImageUrl} style={{ width: '35px' }} />;
  }
}

const getUserQueryOptions = ({ currentUserId }) => ({ variables: { id: currentUserId } });
const getUserQuery = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      avatarImageUrl
    }
  }
`;

const LogoutButtonWithData = compose(
  graphql(getUserQuery, { name: 'getUserQuery', options: getUserQueryOptions, skip: ({ currentUserId }) => !currentUserId })
)(LogoutButton);

function mapStateToProps({ currentUserId }) {
  return { currentUserId: currentUserId.value };
}

export default connect(mapStateToProps, { SetCurrentUserId, SetCurrentUserToken })(LogoutButtonWithData);
