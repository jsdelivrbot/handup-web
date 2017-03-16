import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChangeRoomName } from '../actions';

function NewRoom({ roomName, history, ChangeRoomName }) {
  return (
    <div>
      <h1>What room?</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={roomName} onChange={onRoomNameChange} />
        </div>
        <button type="submit" className="btn btn-xl btn-primary">Enter</button>
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
