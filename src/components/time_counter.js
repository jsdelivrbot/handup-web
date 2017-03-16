import React from 'react';
import moment from 'moment';
import pad from 'pad-number';

import TimedRerenderer from './timed_render';

export default function TimeCounter({ startedAt }) {
  return <TimedRerenderer contentProvider={duration} />;

  function duration() {
    const diffTime = new Date() - new Date(startedAt);
    const duration = moment.duration(diffTime, 'milliseconds');

    return `${duration.minutes()}:${pad(duration.seconds(), 2)}`;
  }
}
