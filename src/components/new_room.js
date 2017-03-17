import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LogoutButton from './logout_button';
import { SetRoomNameInput } from '../actions';

function NewRoom({ roomNameInput, history, SetRoomNameInput }) {
  return (
    <div>
      <div className="flex flex-row flex-align-items-center">
        <div style={{ flex: '1 0' }}>
          <h1>What room?</h1>
        </div>
        <div style={{ flex: '0 0 100px' }}>
          <LogoutButton />
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={roomNameInput} onChange={onRoomNameChange} />
        </div>
        <button type="submit" className="btn btn-xl btn-primary">Enter</button>
      </form>
    </div>
  )

  function onSubmit() {
    history.push(`/room/${roomNameInput}`);
  }

  function onRoomNameChange(event) {
    SetRoomNameInput(event.target.value);
  }
}

function mapStateToProps({ roomNameInput }) {
  return { roomNameInput };
}

export default connect(mapStateToProps, { SetRoomNameInput })(withRouter(NewRoom));
