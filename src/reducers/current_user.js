import { SET_CURRENT_USER_ID, SET_CURRENT_USER_TOKEN } from '../actions';

export default function CurrentUserId(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return { ...state, id: action.payload };
    case SET_CURRENT_USER_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
