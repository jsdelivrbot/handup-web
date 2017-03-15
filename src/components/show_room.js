import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import Line from './line';
import RaiseHandButton from './raise_hand_button';
import LoginButton from './login_button';

function ShowRoom({ roomQuery, userQuery }) {
  if (roomQuery.loading) {
    return <div>Loading ...</div>;
  }

  const room = roomQuery.viewer.allRooms.edges[0].node;
  const user = (userQuery && !userQuery.loading) ? userQuery.getUser : null;

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

    return (
      <div>
        <h2>#{room.name}</h2>
        <Line room={room} />
      </div>
    );
  }

  function renderRaiseHandButton() {
    if (roomQuery.loading || (userQuery && userQuery.loading)) {
      return <div>Loading ...</div>;
    }

    if (user) {
      return <RaiseHandButton roomId={room.id} userId={user.id} />;
    } else {
      return <LoginButton />;
    }
  }
}

const roomByNameQuery = gql`
  query roomByName($name: String!) {
    viewer {
      allRooms(where: { name: { eq: $name } }) {
        edges {
          node {
            id
            name
            lineSpots(orderBy: { field: createdAt, direction: ASC }) {
              edges {
                node {
                  id
                  createdAt
                  user {
                    id
                    name
                    avatarImageUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const getUserQuery = gql`
  query getUser($id: ID!) {
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
  graphql(roomByNameQuery, { name: 'roomQuery', options: roomByNameOptions }),
  graphql(getUserQuery, { name: 'userQuery', options: getUserOptions, skip: ({ userId }) => !userId })
)(ShowRoom);

function mapStateToProps({ userId }) {
  return { userId };
}

export default connect(mapStateToProps)(ShowRoomWithData);
