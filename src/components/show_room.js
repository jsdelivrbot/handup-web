import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import Line from './line';
import LogoutButton from './logout_button';

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
    return (
      <div>
        <div className="flex flex-row flex-align-items-center">
          <div style={{ flex: '1 0' }}>
            <h1>#{this.props.match.params.name}</h1>
          </div>
          <div style={{ flex: '0 0 100px' }}>
            <Link to="/">
              <button className="btn btn-default text-black">Bo back</button>
            </Link>
          </div>
          <div style={{ flex: '0 0' }}>
            <LogoutButton />
          </div>
        </div>

        {this.renderLine()}
      </div>
    );
  }

  renderLine() {
    if (this.props.roomQuery.loading || this.props.roomQuery.viewer.allRooms.edges.length == 0) {
      return <div>Loading ...</div>;
    }

    const room = this.props.roomQuery.viewer.allRooms.edges[0].node;

    return <Line roomId={room.id} />;
  }
}

const roomByNameQueryOptions = ({ match: { params: { name } } }) => ({ variables: { name } });
const roomByNameQuery = gql`
  query roomByName($name: String!) {
    viewer {
      allRooms(where: { name: { eq: $name } }) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const createRoomMutation = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      changedRoom {
        id
      }
    }
  }
`;

export default compose(
  graphql(roomByNameQuery, { name: 'roomQuery', options: roomByNameQueryOptions }),
  graphql(createRoomMutation, { name: 'createRoomMutation' })
)(ShowRoom);
