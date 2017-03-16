import { SET_ROOM_NAME_INPUT } from '../actions';

export default function RoomNameInput(state = '', action) {
  switch (action.type) {
    case SET_ROOM_NAME_INPUT:
      return action.payload;
    default:
      return state;
  }
}
