import { SET_CURRENT_USER_TOKEN } from '../actions';

export default function CurrentUserToken(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER_TOKEN:
      return { value: action.payload };
    default:
      return state;
  }
}
