import { SET_CURRENT_USER_ID } from '../actions';

export default function CurrentUserId(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return action.payload;
    default:
      return state;
  }
}
