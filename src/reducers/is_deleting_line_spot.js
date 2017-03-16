import { SET_IS_DELETING_LINE_SPOT } from '../actions';

export default function IsDeletingLineSpot(state = false, action) {
  switch (action.type) {
    case SET_IS_DELETING_LINE_SPOT:
      return action.payload;
    default:
      return state;
  }
}
