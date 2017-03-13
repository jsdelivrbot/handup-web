import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChangeRoomName } from '../actions';

function NewRoom({ roomName, history, ChangeRoomName }) {
  return (
    <div>
      <h2>Enter room</h2>
      <form onSubmit={onSubmit}>
        <input type="text" value={roomName} onChange={onRoomNameChange} />
        <button type="submit">Enter</button>
      </form>
    </div>
  )

  function onSubmit() {
    history.push(`/room/${roomName}`);
  }

  function onRoomNameChange(event) {
    ChangeRoomName(event.target.value);
  }
}

function mapStateToProps({ roomName }) {
  return { roomName };
}

export default connect(mapStateToProps, { ChangeRoomName })(withRouter(NewRoom));
