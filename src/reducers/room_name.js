import { CHANGE_ROOM_NAME } from '../actions';

export default function RoomName(state = null, action) {
  switch (action.type) {
    case CHANGE_ROOM_NAME:
      return action.payload;
    default:
      return state;
  }
}
