import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import Line from './line';

function ShowRoom({ roomQuery }) {
  if (roomQuery.loading) {
    return <div>Loading ...</div>;
  }

  const room = roomQuery.viewer.allRooms.edges[0].node;

  return (
    <div>
      <h2>#{room.name}</h2>
      <Line room={room} />
    </div>
  );
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

const roomByNameOptions = ({ match: { params: { name } } }) => ({ variables: { name } });

export default compose(
  graphql(roomByNameQuery, { name: 'roomQuery', options: roomByNameOptions }),
)(ShowRoom);
