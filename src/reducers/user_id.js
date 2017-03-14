import { SET_USER_ID } from '../actions';

export default function UserId(state = null, action) {
  switch (action.type) {
    case SET_USER_ID:
      return action.payload;
    default:
      return state;
  }
}
