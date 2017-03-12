import React from 'react';
import { gql, graphql } from 'react-apollo';

function ShowRoom(props) {
  if (props.data.loading) {
    return <div>Loading ...</div>;
  }

  const room = props.data.viewer.allRooms.edges[0].node;

  return (
    <div>
      Room: {room.name}
    </div>
  );
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

const options = ({ match: { params: { name } } }) => ({ variables: { name } });

export default graphql(RoomByName, { options })(ShowRoom);
