import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';

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
              let newEdges;

              switch (subscriptionData.data.subscribeToLineSpot.mutation) {
              case 'createLineSpot':
                const edgesWithCreatedItem = [
                  {
                    node: {
                      ...subscriptionData.data.subscribeToLineSpot.value
                    }
                  },
                  ...prev.getRoom.lineSpots.edges
                ];

                return {
                  getRoom: {
                    lineSpots: {
                      edges: edgesWithCreatedItem
                    }
                  }
                };
              case 'deleteLineSpot':
                const edgesWithoutDeletedItem = _.reject(
                  prev.getRoom.lineSpots.edges,
                  { node: { id: subscriptionData.data.subscribeToLineSpot.value.id } }
                );

                return {
                  getRoom: {
                    lineSpots: {
                      edges: edgesWithoutDeletedItem,
                    }
                  }
                };
              }
            }
          }
        )
    }
  }

  render() {
    if (this.props.getRoomQuery.loading) {
      return <div>Loading ...</div>;
    }

    const room = this.props.getRoomQuery.getRoom;

    return (
      <div>
        <div className="m-b-s">
          <MainButton room={room} />
        </div>

        <ul className="list-group">
          {this.renderLineSpots(room)}
        </ul>
      </div>
    );
  }

  renderLineSpots(room) {
    return room.lineSpots.edges.map(function (lineSpot) {
      return (
        <li className="list-group-item" key={lineSpot.node.id}>
          <LineSpot lineSpot={lineSpot.node} />
        </li>
      );
    });
  }
};

const createLineSpotSubscription = gql`
  subscription subscribeToCreateLineSpot($filter: LineSpotSubscriptionFilter) {
    subscribeToLineSpot(mutations: [createLineSpot, deleteLineSpot], filter: $filter) {
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

const getRoomQueryOptions = ({ roomId }) => ({ variables: { id: roomId } });
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

export default compose(
  graphql(getRoomQuery, { name: 'getRoomQuery', options: getRoomQueryOptions })
)(Line);
