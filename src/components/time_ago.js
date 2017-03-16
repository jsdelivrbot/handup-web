import React, { Component } from 'react';
import moment from 'moment';

export default class TimeAgo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({ text: moment(this.props.time).fromNow() })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span>
        {this.state.text}
      </span>
    );
  }
}
