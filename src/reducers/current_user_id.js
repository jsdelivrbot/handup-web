import { SET_CURRENT_USER_ID } from '../actions';

export default function CurrentUserId(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return { value: action.payload };
    default:
      return state;
  }
}
