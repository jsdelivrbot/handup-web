import { SET_CURRENT_USER_TOKEN } from '../actions';

export default function CurrentUserToken(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
