export const CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export function ChangeRoomName(name) {
  return { type: CHANGE_ROOM_NAME, payload: name }
}

export function SetUserToken(token) {
  // Force instant local storage set
  localStorage.setItem('reduxPersist:userToken', `"${token}"`);

  return { type: SET_USER_TOKEN, payload: token }
}
