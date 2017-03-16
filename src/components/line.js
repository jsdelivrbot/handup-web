import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import LineSpot from './line_spot';
import MainButton from './main_button';

class Line extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.getRoomQuery.loading && !nextProps.getRoomQuery.loading) {
      nextProps
        .getRoomQuery
        .subscribeToMore(
          {
            document: createLineSpotSubscription,
            variables: {
              filter: {
                roomId: {
                  eq: this.props.roomId
                }
              }
            },
            updateQuery: (prev, { subscriptionData }) => {
              switch (subscriptionData.data.subscribeToLineSpot.mutation) {
              case 'createLineSpot':
                return update(prev, {
                  getRoom: {
                    lineSpots: {
                      edges: {
                        $push: [
                          { node: subscriptionData.data.subscribeToLineSpot.value }
                        ]
                      }
                    }
                  }
                });
              case 'updateLineSpot':
                const indexToReplace =  _.findIndex(
                  prev.getRoom.lineSpots.edges,
                  { node: { id: subscriptionData.data.subscribeToLineSpot.value.id } }
                );

                return update(prev, {
                  getRoom: {
                    lineSpots: {
                      edges: {
                        $splice: [[indexToRemove, 1, { node: subscriptionData.data.subscribeToLineSpot.value }]]
                      }
                    }
                  }
                });
              case 'deleteLineSpot':
                const indexToRemove =  _.findIndex(
                  prev.getRoom.lineSpots.edges,
                  { node: { id: subscriptionData.data.subscribeToLineSpot.value.id } }
                );

                return update(prev, {
                  getRoom: {
                    lineSpots: {
                      edges: {
                        $splice: [[indexToRemove, 1]]
                      }
                    }
                  }
                });
              }
            }
          }
        )
    }
  }

  render() {
    const currentUser = (this.props.getUserQuery && this.props.getUserQuery.getUser) ? this.props.getUserQuery.getUser : null;
    const room = this.props.getRoomQuery.getRoom;

    return (
      <div>
        <div className="m-b-s">
          <MainButton room={room} currentUser={currentUser} />
        </div>

        <div className="flex flex-column">
          {this.renderLineSpots(room, currentUser)}
        </div>
      </div>
    );
  }

  renderLineSpots(room, currentUser) {
    if (!room) {
      return;
    }

    return room.lineSpots.edges.map(function (lineSpot, index) {
      return <LineSpot key={lineSpot.node.id} currentUser={currentUser} lineSpot={lineSpot.node} index={index} />;
    });
  }
};

const createLineSpotSubscription = gql`
  subscription subscribeToLineSpot($filter: LineSpotSubscriptionFilter) {
    subscribeToLineSpot(mutations: [createLineSpot, updateLineSpot, deleteLineSpot], filter: $filter) {
      mutation
      value {
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
`;

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

const getRoomQueryOptions = ({ roomId }) => ({
  returnPartialData: true,
  variables: { id: roomId }
});
const getRoomQuery = gql`
  query getRoom($id: ID!) {
    getRoom(id: $id) {
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
`;

const LineWithData = compose(
  graphql(getUserQuery, { name: 'getUserQuery', options: getUserQueryOptions, skip: ({ currentUserId }) => !currentUserId }),
  graphql(getRoomQuery, { name: 'getRoomQuery', options: getRoomQueryOptions })
)(Line);

function mapStateToProps({ currentUserId }) {
  return { currentUserId };
}

export default connect(mapStateToProps)(LineWithData);
