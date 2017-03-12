export const CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME'

export function ChangeRoomName(name) {
  return { type: CHANGE_ROOM_NAME, payload: name }
}
