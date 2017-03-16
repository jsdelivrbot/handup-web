import React, { Component } from 'react';

export default class TimedRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({ content: this.props.contentProvider() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.state.content}
      </div>
    );
  }
}
