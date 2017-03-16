export const CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_RETURN_TO = 'SET_RETURN_TO';
export const SET_IS_CREATING_LINE_SPOT = 'SET_IS_CREATING_LINE_SPOT';

export function ChangeRoomName(name) {
  return { type: CHANGE_ROOM_NAME, payload: name }
}

export function SetUserId(id) {
  return { type: SET_USER_ID, payload: id }
}

export function SetUserToken(token) {
  return { type: SET_USER_TOKEN, payload: token }
}

export function SetReturnTo(location) {
  return { type: SET_RETURN_TO, payload: location }
}

export function SetIsCreatingLineSpot(isCreatingLineSpot) {
  return { type: SET_IS_CREATING_LINE_SPOT, payload: isCreatingLineSpot }
}
