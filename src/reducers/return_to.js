import { SET_RETURN_TO } from '../actions';

export default function ReturnTo(state = null, action) {
  switch (action.type) {
    case SET_RETURN_TO:
      return action.payload;
    default:
      return state;
  }
}
