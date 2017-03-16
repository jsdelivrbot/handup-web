import React from 'react';
import moment from 'moment';

import TimedRender from './timed_render';

export default function TimeAgo({ time }) {
  return <TimedRender contentProvider={timeFromNow} />;

  function timeFromNow() {
    return moment(time).fromNow();
  }
}
