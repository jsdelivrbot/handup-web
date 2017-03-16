import React, { Component } from 'react';
import moment from 'moment';

export default class TimeAgo extends Component {
  render() {
    return (
      <span>
        {moment(this.props.time).fromNow()}
      </span>
    );
  }
}
