import { combineReducers } from 'redux';

import roomName from './room_name';
import userToken from './user_token';
import returnTo from './return_to';

const rootReducer = combineReducers({
  roomName,
  userToken,
  returnTo
});

export default rootReducer;
