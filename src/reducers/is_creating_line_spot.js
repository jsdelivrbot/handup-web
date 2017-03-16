import { SET_IS_CREATING_LINE_SPOT } from '../actions';

export default function IsCreatingLineSpot(state = false, action) {
  switch (action.type) {
    case SET_IS_CREATING_LINE_SPOT:
      return action.payload;
    default:
      return state;
  }
}
