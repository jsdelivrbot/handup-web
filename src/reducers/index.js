import { combineReducers } from 'redux';

import roomName from './room_name';
import userToken from './user_token';

const rootReducer = combineReducers({
  roomName,
  userToken
});

export default rootReducer;
