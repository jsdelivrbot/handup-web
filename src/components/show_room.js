import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import RaiseHandButton from './raise_hand_button';
import LoginButton from './login_button';

function ShowRoom({ roomQuery, userQuery }) {
  if (roomQuery.loading) {
    return <div>Loading ...</div>;
  }

  const room = roomQuery.viewer.allRooms.edges[0].node;
  const user = !userQuery.loading ? userQuery.getUser : null;

  return (
    <div>
      <div>
        {renderRoom()}
      </div>
      <div>
        {renderRaiseHandButton()}
      </div>
    </div>
  );

  function renderRoom() {
    if (roomQuery.loading) {
      return <div>Loading ...</div>;
    }

    return <h2>#{room.name}</h2>;
  }

  function renderRaiseHandButton() {
    if (userQuery.loading) {
      return <div>Loading ...</div>;
    }

    if (user) {
      return <RaiseHandButton />;
    } else {
      return <LoginButton />;
    }
  }
}

const RoomByName = gql`
  query RoomByName($name: String!) {
    viewer {
      allRooms(where: { name: { eq: $name } }) {
        edges {
          node {
            id
            name
            lineSpots {
              edges {
                node {
                  position
                }
              }
            }
          }
        }
      }
    }
  }
`

const GetUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      avatarImageUrl
    }
  }
`

const roomByNameOptions = ({ match: { params: { name } } }) => ({ variables: { name } });
const getUserOptions = ({ userId }) => ({ variables: { id: userId } });

const ShowRoomWithData = compose(
  graphql(RoomByName, { name: 'roomQuery', options: roomByNameOptions }),
  graphql(GetUser, { name: 'userQuery', options: getUserOptions, skip: (ownProps) => !ownProps.userId })
)(ShowRoom);

function mapStateToProps({ userId }) {
  return { userId };
}

export default connect(mapStateToProps)(ShowRoomWithData);
