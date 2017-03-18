import _ from 'lodash';
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
        <div className="flex flex-row flex-align-items-center m-b-xs">
          <div style={{ flex: '0 0 55px' }}>
            <Link to="/">
              <button className="btn btn-default text-black faded">
                <i className="fa fa-arrow-left" />
              </button>
            </Link>
          </div>
          <div style={{ flex: '1 0' }}>
            <h1 className="m-b-z">#{this.props.match.params.name}</h1>
          </div>
          <div style={{ flex: '0 0 100px', textAlign: 'right' }}>
            <LogoutButton />
          </div>
        </div>

        {this.renderLine()}
      </div>
    );
  }

  renderLine() {
    const roomId = _.get(this.props.roomQuery, 'viewer.allRooms.edges[0].node.id');

    return <Line roomId={roomId} />;
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
