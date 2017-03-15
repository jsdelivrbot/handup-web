import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import Line from './line';

class ShowRoom extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.roomQuery.loading && nextProps.roomQuery.viewer.allRooms.edges.length == 0) {
      const input = { name: this.props.match.params.name };

      this
        .props
        .createRoomMutation({ variables: { input } })
        .then(() => this.props.roomQuery.refetch());
    }
  }

  render() {
    if (this.props.roomQuery.loading || this.props.roomQuery.viewer.allRooms.edges.length == 0) {
      return <div>Loading ...</div>;
    }

    const room = this.props.roomQuery.viewer.allRooms.edges[0].node;

    return (
      <div>
        <h1>#{room.name}</h1>
        <Line room={room} />
      </div>
    );
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

const roomByNameOptions = ({ match: { params: { name } } }) => ({ variables: { name } });

const createRoomMutation = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      changedRoom {
        id
      }
    }
  }
`

export default compose(
  graphql(roomByNameQuery, { name: 'roomQuery', options: roomByNameOptions }),
  graphql(createRoomMutation, { name: 'createRoomMutation' })
)(ShowRoom);
