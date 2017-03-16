export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
export const SET_CURRENT_USER_TOKEN = 'SET_CURRENT_USER_TOKEN';
export const CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME';
export const SET_RETURN_TO = 'SET_RETURN_TO';
export const SET_IS_CREATING_LINE_SPOT = 'SET_IS_CREATING_LINE_SPOT';
export const SET_IS_DELETING_LINE_SPOT = 'SET_IS_DELETING_LINE_SPOT';

export function SetCurrentUserId(id) {
  return { type: SET_CURRENT_USER_ID, payload: id }
}

export function SetCurrentUserToken(token) {
  return { type: SET_CURRENT_USER_TOKEN, payload: token }
}

export function ChangeRoomName(name) {
  return { type: CHANGE_ROOM_NAME, payload: name }
}

export function SetReturnTo(location) {
  return { type: SET_RETURN_TO, payload: location }
}

export function SetIsCreatingLineSpot(isCreatingLineSpot) {
  return { type: SET_IS_CREATING_LINE_SPOT, payload: isCreatingLineSpot }
}

export function SetIsDeletingLineSpot(isDeletingLineSpot) {
  return { type: SET_IS_DELETING_LINE_SPOT, payload: isDeletingLineSpot }
}
